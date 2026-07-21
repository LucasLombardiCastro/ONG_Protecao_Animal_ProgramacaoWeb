'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Phone, Mail, PawPrint, HandHeart, Clock, MessageCircleQuestion, CheckCircle2, Loader2, Package } from 'lucide-react';
import { Request, RequestStatus, RequestType, AdoptionRequest, VolunteerRequest, SupplyDonationRequest } from '../../types/domain';
import { REQUEST_STATUS, REQUEST_TYPE } from '../../constants/app';
import { requestService } from '../../services/requestService';
import { sessionStorage } from '../../utils/api';
import { logger } from '../../utils/logger';

const TIPO_INFO: Record<RequestType, { label: string; icon: typeof PawPrint; badge: string }> = {
  [REQUEST_TYPE.ADOPTION]: { label: 'Adoção', icon: PawPrint, badge: 'bg-orange-100 text-orange-600' },
  [REQUEST_TYPE.VOLUNTEER]: { label: 'Voluntariado', icon: HandHeart, badge: 'bg-green-100 text-green-700' },
  [REQUEST_TYPE.SUPPLY]: { label: 'Doação de Insumos', icon: Package, badge: 'bg-blue-100 text-blue-700' },
};

const statusConfig: Record<RequestStatus, { color: string; bg: string; icon: React.ElementType }> = {
  [REQUEST_STATUS.NOT_CONTACTED]: { color: 'text-stone-500', bg: 'bg-stone-100', icon: Clock },
  [REQUEST_STATUS.AWAITING_RESPONSE]: { color: 'text-orange-600', bg: 'bg-orange-100', icon: MessageCircleQuestion },
  [REQUEST_STATUS.ANSWERED]: { color: 'text-green-700', bg: 'bg-green-100', icon: CheckCircle2 },
};

/**
 * Format phone number to WhatsApp link format
 * Removes special characters and adds Brazil country code
 */
const formatPhoneToWhatsApp = (phone: string): string => {
  const numbers = phone.replace(/\D/g, '');
  return `55${numbers}`;
};

export default function SolicitacoesPage() {
  const router = useRouter();
  
  const [solicitacoes, setSolicitacoes] = useState<Request[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<RequestType | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const [selecionada, setSelecionada] = useState<Request | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Se não tiver sessão ativa, redireciona para login
  useEffect(() => {
    if (!sessionStorage.exists()) {
      router.push('/authentication/login');
      return;
    }

    requestService
      .listAll()
      .then(setSolicitacoes)
      .catch((error: unknown) => {
        const mensagem = error instanceof Error ? error.message : 'Erro ao carregar solicitações.';
        logger.error('Falha ao listar solicitações', mensagem);
        setErro(mensagem);
      })
      .finally(() => setCarregando(false));
  }, [router]);

  const filtradas = solicitacoes.filter(s => {
    const matchTipo = abaAtiva === 'todos' || s.tipo === abaAtiva;
    const matchBusca = s.nome.toLowerCase().includes(busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  const handleStatusChange = async (id: number, novoStatus: RequestStatus) => {
    try {
      await requestService.updateStatus(id, novoStatus);
      logger.info('Status alterado', { id, novoStatus });
      setSolicitacoes(prev => prev.map(s => s.id === id ? { ...s, status: novoStatus } : s));
      setSelecionada(prev => prev && prev.id === id ? { ...prev, status: novoStatus } : prev);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar status.';
      logger.error('Falha ao atualizar status', mensagem);
      alert(mensagem);
    }
  };

  const handleNotasChange = async (id: number, novasNotas: string) => {
    try {
      await requestService.updateNotes(id, novasNotas);
      logger.info('Notas atualizadas', { id });
      setSolicitacoes(prev => prev.map(s => s.id === id ? { ...s, notas: novasNotas } : s));
      setSelecionada(prev => prev && prev.id === id ? { ...prev, notas: novasNotas } : prev);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao salvar notas.';
      logger.error('Falha ao atualizar notas', mensagem);
      alert(mensagem);
    }
  };

  const counts = {
    todos: solicitacoes.length,
    [REQUEST_TYPE.ADOPTION]: solicitacoes.filter(s => s.tipo === REQUEST_TYPE.ADOPTION).length,
    [REQUEST_TYPE.VOLUNTEER]: solicitacoes.filter(s => s.tipo === REQUEST_TYPE.VOLUNTEER).length,
    [REQUEST_TYPE.SUPPLY]: solicitacoes.filter(s => s.tipo === REQUEST_TYPE.SUPPLY).length,
  };

  return (
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full text-sm mb-4">
          Área Interna
        </div>
        <h1 className="text-4xl font-bold text-stone-800">
          Solicitações <span className="text-orange-500">Recebidas</span>
        </h1>
        <p className="text-stone-500 font-medium mt-2">
          Acompanhe e gerencie os pedidos de adoção e voluntariado.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setAbaAtiva('todos')}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all w-full md:w-auto ${
              abaAtiva === 'todos' 
                ? 'bg-stone-800 text-white shadow-md' 
                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
            }`}
          >
            Todos
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">{counts.todos}</span>
          </button>
          <button
            onClick={() => setAbaAtiva(REQUEST_TYPE.ADOPTION)}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all w-full md:w-auto ${
              abaAtiva === REQUEST_TYPE.ADOPTION
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-orange-50 text-orange-400 hover:bg-orange-100'
            }`}
          >
            <PawPrint size={16} /> Adoção
            <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">{counts[REQUEST_TYPE.ADOPTION]}</span>
          </button>
          <button
            onClick={() => setAbaAtiva(REQUEST_TYPE.VOLUNTEER)}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all w-full md:w-auto ${
              abaAtiva === REQUEST_TYPE.VOLUNTEER
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
          >
            <HandHeart size={16} /> Voluntariado
            <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">{counts[REQUEST_TYPE.VOLUNTEER]}</span>
          </button>
          <button
            onClick={() => setAbaAtiva(REQUEST_TYPE.SUPPLY)}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all w-full md:w-auto ${
              abaAtiva === REQUEST_TYPE.SUPPLY ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <Package size={16} /> Insumos
            <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">{counts[REQUEST_TYPE.SUPPLY]}</span>
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome..."
            className="w-full bg-white border border-stone-200 rounded-full py-3 pl-11 pr-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>
      </div>

      {/* Request List */}
      {carregando ? (
        <div className="flex justify-center py-20 text-stone-400">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : filtradas.length === 0 ? (
        <div className="text-center py-20 text-stone-400 font-medium">
          Nenhuma solicitação encontrada.
        </div>
      ) : (
        <div className="space-y-12">
          {/* Solicitações ativas */}
          {(() => {
            const ativas = filtradas.filter(s => s.status !== 'Respondido');
            return ativas.length > 0 ? (
              <div>
                <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  Solicitações Ativas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ativas.map(s => {
                    const StatusIcon = statusConfig[s.status].icon;
                    const TipoIcon = TIPO_INFO[s.tipo].icon; // <- nova linha
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelecionada(s)}
                        className="rounded-3xl p-6 shadow-sm border bg-white border-orange-50 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4"
                      >
                        <div className="flex justify-between items-start">
                          <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${TIPO_INFO[s.tipo].badge}`}>
                            <TipoIcon size={12} />
                            {TIPO_INFO[s.tipo].label}
                          </div>
                          <span className="text-xs text-stone-400 font-medium">{s.data}</span>
                        </div>

                        {s.tipo === 'adocao' ? (
                          <div className="flex items-center gap-4">
                            <img src={s.animal_foto} alt={s.animal_nome} className="w-16 h-16 rounded-2xl object-cover" />
                            <div>
                              <p className="font-bold text-stone-800 text-lg leading-tight">{s.nome}</p>
                              <p className="text-stone-400 text-sm font-medium">Interesse em <span className="text-orange-500 font-bold">{s.animal_nome}</span></p>
                            </div>
                          </div>
                        ) : s.tipo === 'voluntario' ? (
                          <div>
                            <p className="font-bold text-stone-800 text-lg leading-tight">{s.nome}</p>
                            <p className="text-stone-400 text-sm font-medium line-clamp-1">{s.interesse}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold text-stone-800 text-lg leading-tight">{s.nome}</p>
                            <p className="text-stone-400 text-sm font-medium line-clamp-1">{s.itens}</p>
                          </div>
                        )}

                        <div className={`flex items-center gap-2 ${statusConfig[s.status].bg} ${statusConfig[s.status].color} text-xs font-bold px-3 py-2 rounded-xl mt-auto`}>
                          <StatusIcon size={14} />
                          {s.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })()}

          {/* Solicitações finalizadas */}
          {(() => {
            const finalizadas = filtradas.filter(s => s.status === 'Respondido');
            return finalizadas.length > 0 ? (
              <div>
                <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                  Solicitações Finalizadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {finalizadas.map(s => {
                    const StatusIcon = statusConfig[s.status].icon;
                    const TipoIcon = TIPO_INFO[s.tipo].icon; // <- nova linha
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelecionada(s)}
                        className="rounded-3xl p-6 shadow-sm border bg-stone-100 border-stone-200 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col gap-4 opacity-75"
                      >
                        <div className="flex justify-between items-start">
                          <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${TIPO_INFO[s.tipo].badge}`}>
                            <TipoIcon size={12} />
                            {TIPO_INFO[s.tipo].label}
                          </div>
                          <span className="text-xs text-stone-400 font-medium">{s.data}</span>
                        </div>

                        {s.tipo === 'adocao' ? (
                          <div className="flex items-center gap-4">
                            <img src={s.animal_foto} alt={s.animal_nome} className="w-16 h-16 rounded-2xl object-cover opacity-60" />
                            <div>
                              <p className="font-bold text-stone-800 text-lg leading-tight">{s.nome}</p>
                              <p className="text-stone-400 text-sm font-medium">Interesse em <span className="text-orange-500 font-bold">{s.animal_nome}</span></p>
                            </div>
                          </div>
                        ) : s.tipo === 'voluntario' ? (
                          <div>
                            <p className="font-bold text-stone-800 text-lg leading-tight">{s.nome}</p>
                            <p className="text-stone-400 text-sm font-medium line-clamp-1">{s.interesse}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold text-stone-800 text-lg leading-tight">{s.nome}</p>
                            <p className="text-stone-400 text-sm font-medium line-clamp-1">{s.itens}</p>
                          </div>
                        )}

                        <div className={`flex items-center gap-2 ${statusConfig[s.status].bg} ${statusConfig[s.status].color} text-xs font-bold px-3 py-2 rounded-xl mt-auto`}>
                          <StatusIcon size={14} />
                          {s.status}
                        </div>

                        <p className="text-[11px] text-stone-400 font-medium -mt-2">
                          Solicitação já finalizada
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}

      {/* Adicionar novos usuários */}
      

      

      {selecionada && (
        <SolicitacaoModal
          solicitacao={selecionada}
          onClose={() => setSelecionada(null)}
          onStatusChange={handleStatusChange}
          onNotasChange={handleNotasChange}
        />
      )}
    </main>
  );
}

function SolicitacaoModal({
  solicitacao,
  onClose,
  onStatusChange,
  onNotasChange,
}: {
  solicitacao: Request;
  onClose: () => void;
  onStatusChange: (id: number, status: RequestStatus) => void;
  onNotasChange: (id: number, notas: string) => void;
}) {
  const [notasLocal, setNotasLocal] = useState(solicitacao.notas);
  const tipoInfo = TIPO_INFO[solicitacao.tipo];
  const TipoIcon = tipoInfo.icon;
  const statuses: RequestStatus[] = [REQUEST_STATUS.NOT_CONTACTED, REQUEST_STATUS.AWAITING_RESPONSE, REQUEST_STATUS.ANSWERED];

  const handleSalvarNotas = () => {
    if (notasLocal !== solicitacao.notas) {
      onNotasChange(solicitacao.id, notasLocal);
    }
  };

  const handleFechar = () => {
  handleSalvarNotas();
  onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white relative shadow-2xl w-full max-w-2xl rounded-[2.5rem] max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95">

        <button onClick={handleFechar} className="absolute z-20 top-6 right-6 p-2 bg-white/50 backdrop-blur-md rounded-full text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm">
          <X size={24} />
        </button>

        <div className="overflow-y-auto p-8 md:p-12 space-y-8 bg-stone-50">
          {/* Cabeçalho */}
          <div className="flex items-start gap-6">
            {solicitacao.tipo === 'adocao' ? (
              <img src={solicitacao.animal_foto} alt={solicitacao.animal_nome} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <TipoIcon size={32} className="text-stone-500" />
              </div>
            )}
            <div>
              <div className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full mb-2 ${solicitacao.tipo === 'adocao' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-700'}`}>
                <TipoIcon size={12} />
                Solicitação de {tipoInfo.label}
              </div>
              <h2 className="text-3xl font-bold text-stone-800">{solicitacao.nome}</h2>
              <p className="text-stone-400 text-sm font-medium mt-1">Recebido em {solicitacao.data}</p>
            </div>
          </div>

          {/* Informações de contato */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 space-y-3">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-widest mb-2">Contato</p>
            <a
              href={`https://wa.me/${formatPhoneToWhatsApp(solicitacao.telefone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-stone-700 font-medium hover:text-orange-500 transition-colors w-fit"
            >
              <Phone size={18} className="text-orange-500" /> {solicitacao.telefone}
            </a>
            {solicitacao.email && (
              <a
                href={`mailto:${solicitacao.email}`}
                className="flex items-center gap-3 text-stone-700 font-medium hover:text-orange-500 transition-colors w-fit"
              >
                <Mail size={18} className="text-orange-500" /> {solicitacao.email}
              </a>
            )}
          </div>

          {/* Detalhes específicos */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 space-y-4">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-widest">Detalhes da Solicitação</p>
            {solicitacao.tipo === REQUEST_TYPE.ADOPTION ? (
              <p className="text-stone-700 font-medium">
                Demonstrou interesse em adotar <span className="font-bold text-orange-500">{(solicitacao as AdoptionRequest).animal_nome}</span>.
              </p>
            ) : solicitacao.tipo === REQUEST_TYPE.VOLUNTEER ? (
              <>
                <div>
                  <p className="text-sm text-stone-400 font-bold mb-1">Disponibilidade</p>
                  <p className="text-stone-700 font-medium">{(solicitacao as VolunteerRequest).disponibilidade}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-400 font-bold mb-1">Área de interesse</p>
                  <p className="text-stone-700 font-medium">{(solicitacao as VolunteerRequest).interesse}</p>
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm text-stone-400 font-bold mb-1">Itens oferecidos</p>
                <p className="text-stone-700 font-medium">{(solicitacao as SupplyDonationRequest).itens}</p>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-widest">Status do atendimento</p>
            <div className="flex flex-wrap gap-3">
              {statuses.map(status => {
                const StatusIcon = statusConfig[status].icon;
                const ativo = solicitacao.status === status;
                return (
                  <button
                    key={status}
                    onClick={() => onStatusChange(solicitacao.id, status)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                      ativo
                        ? `${statusConfig[status].bg} ${statusConfig[status].color} ring-2 ring-offset-2 ring-current shadow-sm`
                        : 'bg-white text-stone-400 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <StatusIcon size={16} />
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notas internas */}
          <div className="space-y-3">
            <p className="text-xs uppercase font-bold text-stone-400 tracking-widest">Notas internas</p>
            <textarea
              value={notasLocal}
              onChange={(e) => setNotasLocal(e.target.value)}
              onBlur={handleSalvarNotas}
              placeholder="Adicione observações sobre o contato, agendamentos, etc..."
              className="w-full bg-white border border-stone-200 rounded-2xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all resize-none h-28"
            />
          </div>
        </div>
      </div>
    </div>
  );
}