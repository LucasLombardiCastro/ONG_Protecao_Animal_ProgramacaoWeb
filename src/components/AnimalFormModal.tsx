'use client';

import { useState, useRef } from 'react';
import { Animal } from '../types/domain';
import { X, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { ANIMAL_SPECIE, ANIMAL_SIZE, ANIMAL_STATUS } from '../constants/app';
import { animalService, AnimalPayload } from '../services/animalService';
import { logger } from '../utils/logger';
import { uploadImagem } from '../services/uploadService';

interface AnimalFormModalProps {
  animal?: Animal | null;
  onClose: () => void;
  onSaved?: () => void;
  onUpdated?: (animal: Animal) => void;
  onDeleted?: (id: string) => void;
}

export default function AnimalFormModal({ animal = null, onClose, onSaved, onUpdated, onDeleted }: AnimalFormModalProps) {
  const isEditing = !!animal;

  const id = animal?.id;
  const [foto, setFoto] = useState(animal?.foto_url || '');
  const [nome, setNome] = useState(animal?.nome || '');
  const [especie, setEspecie] = useState(animal?.especie || ANIMAL_SPECIE.DOG);
  const [idade, setIdade] = useState(animal?.idade || '');
  const [porte, setPorte] = useState(animal?.porte || ANIMAL_SIZE.MEDIUM);
  const [temperamento, setTemperamento] = useState(animal?.temperamento || '');
  const [historia, setHistoria] = useState(animal?.historia || '');
  const [vacinas, setVacinas] = useState(animal?.vacinas.join(', ') || '');
  const [status, setStatus] = useState(animal?.status || ANIMAL_STATUS.WAITING);
  const [adotante, setAdotante] = useState(animal?.nome_adotante || '');
  const [contato, setContato] = useState(animal?.contato_adotante || '');

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const [erroFoto, setErroFoto] = useState('');

  const handleSalvar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setErro('');
    setSalvando(true);

    const payload: AnimalPayload = {
      nome,
      especie: especie as typeof ANIMAL_SPECIE[keyof typeof ANIMAL_SPECIE],
      idade,
      porte: porte as typeof ANIMAL_SIZE[keyof typeof ANIMAL_SIZE],
      temperamento,
      historia,
      foto_url: foto,
      vacinas: vacinas.split(',').map((v) => v.trim()).filter(Boolean),
      status: status as typeof ANIMAL_STATUS[keyof typeof ANIMAL_STATUS],
      nome_adotante: adotante,
      contato_adotante: contato,
      ...(animal?.doc_adocao_url && { doc_adocao_url: animal.doc_adocao_url }),
    };

    try {
      if (isEditing && animal) {
        logger.info('Editando animal:', { id: animal.id, ...payload });
        const animalAtualizado = await animalService.update(animal.id, payload);
        onUpdated?.(animalAtualizado);
      } else {
        logger.info('Criando novo animal:', payload);
        await animalService.create(payload);
        onSaved?.();
      }

      onClose();

    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao salvar animal.';
      logger.error('Falha ao salvar animal', mensagem);
      setErro(mensagem);

    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    setErro('');
    setSalvando(true);

    try {
      if (id) {
        await animalService.remove(id);
        onDeleted?.(id);
      }
      onClose();

    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao excluir animal.';
      logger.error('Falha ao excluir animal', mensagem);
      setErro(mensagem);

    } finally {
      setSalvando(false);
    }
  };

  const handleSelecionarArquivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    setErroFoto('');
    setEnviandoFoto(true);
    try {
      const url = await uploadImagem(arquivo);
      setFoto(url);
    } catch (error) {
      setErroFoto(error instanceof Error ? error.message : 'Erro ao enviar a foto.');
    } finally {
      setEnviandoFoto(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white relative shadow-2xl w-full max-w-4xl rounded-[2.5rem] max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95">

        <button 
          onClick={onClose} 
          className="absolute z-20 top-6 right-6 p-2 bg-white/50 backdrop-blur-md rounded-full text-stone-600 hover:text-stone-900 hover:bg-white transition-all shadow-sm"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          {/* Photo Section */}
          <div className="md:w-5/12 h-6/12 md:h-auto flex-shrink-0 bg-stone-100 flex flex-col items-center justify-center gap-4 p-8">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleSelecionarArquivo}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={enviandoFoto}
              className="relative w-full h-40 rounded-2xl overflow-hidden group"
            >
              {foto ? (
                <img src={foto} alt="Pré-visualização" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center text-stone-400 gap-2 bg-white">
                  <Upload size={32} />
                  <span className="text-sm font-medium">Clique para escolher uma foto</span>
                </div>
              )}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-bold text-sm flex items-center gap-2">
                  <Upload size={18} /> Trocar foto
                </span>
              </div>
              {enviandoFoto && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <Loader2 className="animate-spin text-orange-500" size={28} />
                </div>
              )}
            </button>
            {erroFoto && <p className="text-red-600 text-xs font-medium text-center">{erroFoto}</p>}
            
            <button
              onClick={handleExcluir} 
              className="w-full bg-red-200 text-red-600 font-bold py-4 rounded-xl hover:text-white hover:bg-red-600 transition-all "
              disabled={salvando || enviandoFoto}
            >
              Excluir Animal
            </button>
          </div>

          {/* Form Section */}
          <div className="md:w-7/12 p-8 md:p-12 flex flex-col space-y-6 bg-stone-50">
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">
                {isEditing ? 'Editar Animal' : 'Novo Animal'}
              </h2>
              <p className="text-stone-500 text-sm font-medium">
                Preencha as informações para {isEditing ? 'atualizar' : 'cadastrar'} um novo amigo.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSalvar}>
              <input 
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                placeholder="Nome do animal" 
                required 
              />

              <div className="grid grid-cols-2 gap-4">
                <select 
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                >
                  <option value={ANIMAL_SPECIE.DOG}>{ANIMAL_SPECIE.DOG}</option>
                  <option value={ANIMAL_SPECIE.CAT}>{ANIMAL_SPECIE.CAT}</option>
                </select>

                <select 
                  value={porte}
                  onChange={(e) => setPorte(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                >
                  <option value={ANIMAL_SIZE.SMALL}>{ANIMAL_SIZE.SMALL}</option>
                  <option value={ANIMAL_SIZE.MEDIUM}>{ANIMAL_SIZE.MEDIUM}</option>
                  <option value={ANIMAL_SIZE.LARGE}>{ANIMAL_SIZE.LARGE}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                  placeholder="Idade (ex: 2 anos)" 
                  required 
                />
                <input 
                  type="text"
                  value={temperamento}
                  onChange={(e) => setTemperamento(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                  placeholder="Temperamento (ex: Dócil)" 
                  required 
                />
              </div>

              <input 
                type="text"
                value={vacinas}
                onChange={(e) => setVacinas(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                placeholder="Vacinas (separadas por vírgula)" 
              />

              <textarea 
                value={historia}
                onChange={(e) => setHistoria(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all resize-none h-28" 
                placeholder="História do animal..." 
                required
              />

              {isEditing && (
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                >
                  <option value={ANIMAL_STATUS.WAITING}>{ANIMAL_STATUS.WAITING}</option>
                  <option value={ANIMAL_STATUS.ADOPTED}>{ANIMAL_STATUS.ADOPTED}</option>
                </select>
              )}

              {status == ANIMAL_STATUS.ADOPTED && (
                  <div className='space-y-4'>
                    <input 
                      type="text"
                      value={adotante}
                      onChange={(e) => setAdotante(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                      placeholder="Nome do adotante" 
                      required 
                    />
                    <input 
                      type="text"
                      value={contato}
                      onChange={(e) => setContato(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                      placeholder="Telefone do adotante" 
                      required 
                    />
                  </div>
              )}

              <button
                type="submit" 
                className="w-full mb-4 bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all text-lg"
                disabled={salvando || enviandoFoto}
              >
                {isEditing ? 'Atualizar Animal' : 'Cadastrar Animal'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
