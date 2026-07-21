'use client';

import { useState } from 'react';
import { Animal } from '../types/domain';
import { X, Check, Info, Link as LinkIcon } from 'lucide-react';
import { ANIMAL_STATUS, UI_CONFIG } from '../constants/app';
import { requestService } from '../services/requestService';
import { logger } from '../utils/logger';
import { dataAtual } from '../utils/date';
import { useEffect } from 'react';
import { sessionStorage } from '../utils/api';

interface AdoptionModalProps {
  animal: Animal | null;
  onClose: () => void;
}

export default function AdoptionModal({ animal, onClose }: AdoptionModalProps) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [logado, setLogado] = useState(false);

  if (!animal) return null;
  useEffect(() => {
    setLogado(sessionStorage.exists());
  }, []);

  useEffect(() => {
    
  })

  const isAdotado = animal.status === ANIMAL_STATUS.ADOPTED;

    const handleEnviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);

    try {
      await requestService.createAdoption(
        {
          nome,
          telefone,
          animal_id: animal.id,
          animal_nome: animal.nome,
          animal_foto: animal.foto_url,
        },
        dataAtual()
      );

      logger.info('Solicitação de adoção enviada', { nome, telefone, animal_id: animal.id });

      setEnviado(true);
      setNome('');
      setTelefone('');

      setTimeout(() => {
        setEnviado(false);
        setMostrarForm(false);
      }, UI_CONFIG.TOAST_DURATION);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Não foi possível enviar sua solicitação.';
      logger.error('Falha ao enviar solicitação de adoção', mensagem);
      setErro(mensagem);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white relative shadow-2xl w-full max-w-4xl rounded-[2.5rem] max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95">
        
        <button 
          onClick={onClose} 
          className="absolute z-20 top-6 right-6 p-2 bg-white/50 backdrop-blur-md rounded-full text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          <div className="md:w-5/12 h-72 md:h-auto flex-shrink-0">
            <img src={animal.foto_url} alt={animal.nome} className="w-full h-full object-cover" />
          </div>
          
          <div className="md:w-7/12 p-8 md:p-12 flex flex-col space-y-8 bg-stone-50">
            <div>
              <h2 className="text-4xl font-bold text-stone-800 mb-2">{animal.nome}</h2>
              <span className={`font-bold px-4 py-1.5 rounded-full text-sm inline-block ${
                isAdotado ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {isAdotado ? 'Adotado' : animal.temperamento}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-stone-800 text-xl">A história de {animal.nome}</h3>
              <p className="text-stone-600 leading-relaxed font-medium">
                {isAdotado 
                  ? `Depois de uma longa jornada, ${animal.nome} finalmente encontrou o colo e o carinho que merecia. Nossa maior alegria é ver esse final feliz em um lar cheio de amor!` 
                  : animal.historia}
              </p>
            </div>

            {(isAdotado && logado)  ? (
              /* Staff Only Section */
              <div className="mt-auto pt-6">
                <div className="p-6 bg-white border-2 border-orange-200 border-dashed rounded-3xl shadow-sm">
                  <p className="text-xs uppercase font-bold text-orange-600 tracking-widest mb-4 flex items-center gap-2">
                    <Info size={16} /> Acesso da Equipe
                  </p>
                  <div className="space-y-3 text-sm text-stone-600 font-medium">
                    <p className="flex justify-between border-b border-stone-100 pb-2">
                      <span>Adotante:</span> 
                      <span className="text-stone-800">{animal.nome_adotante || 'Não registrado'}</span>
                    </p>
                    <p className="flex justify-between border-b border-stone-100 pb-2">
                      <span>Contato:</span> 
                      <span className="text-stone-800">{animal.contato_adotante || 'Não registrado'}</span>
                    </p>
                    <div className="pt-2">
                      {animal.doc_adocao_url && (
                        <a 
                          href={animal.doc_adocao_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-xl"
                        >
                          <LinkIcon size={16} /> Ver Documentação
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Adoption Request Section */
              <div className="mt-auto space-y-6">
                <div className="space-y-1">
                  <p className="text-sm text-stone-400 uppercase tracking-widest font-bold">Cuidados de Saúde</p>
                  <p className="font-medium text-stone-700 flex items-center gap-2">
                    <Check size={18} className="text-green-500" /> 
                    Vacinado ({animal.vacinas.join(', ')})
                  </p>
                </div>


                {!isAdotado && (
                  !mostrarForm ? (
                    <button 
                      onClick={() => setMostrarForm(true)}
                      className="w-full border-2 border-orange-500 text-orange-500 font-bold py-4 rounded-full hover:bg-orange-500 hover:text-white transition-all text-lg"
                    >
                      Gostei! Quero conhecer mais!
                    </button>
                  ) : enviado ? (
                    <div className="bg-green-50 text-green-700 p-6 rounded-3xl text-center font-medium animate-in fade-in border border-green-100">
                      Que incrível! Seus dados foram enviados. Um voluntário vai te chamar no WhatsApp em breve.
                    </div>
                  ) : (
                    <form className="space-y-6 animate-in fade-in bg-white p-6 rounded-3xl shadow-sm border border-stone-100" onSubmit={handleEnviar}>
                      <p className="font-bold text-stone-800 text-lg">Me passa seu contato?</p>
                      <div className="space-y-4">
                        <input 
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                          placeholder="Como você se chama?" 
                          required 
                        />
                        <input 
                          type="tel"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                          placeholder="Seu melhor WhatsApp" 
                          required 
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-stone-800 text-white font-bold py-4 rounded-xl hover:bg-stone-900 transition-all"
                      >
                        Enviar contato
                      </button>
                    </form>
                  )
                )}
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}