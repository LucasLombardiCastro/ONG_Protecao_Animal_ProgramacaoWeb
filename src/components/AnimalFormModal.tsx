'use client';

import { useState } from 'react';
import { Animal } from '../types/domain';
import { X, Upload } from 'lucide-react';
import { ANIMAL_SPECIE, ANIMAL_SIZE, ANIMAL_STATUS } from '../constants/app';
import { logger } from '../utils/logger';

interface AnimalFormModalProps {
  animal?: Animal | null;
  onClose: () => void;
}

export default function AnimalFormModal({ animal = null, onClose }: AnimalFormModalProps) {
  const isEditing = !!animal;

  const [foto, setFoto] = useState(animal?.foto_url || '');
  const [nome, setNome] = useState(animal?.nome || '');
  const [especie, setEspecie] = useState(animal?.especie || ANIMAL_SPECIE.DOG);
  const [idade, setIdade] = useState(animal?.idade || '');
  const [porte, setPorte] = useState(animal?.porte || ANIMAL_SIZE.MEDIUM);
  const [temperamento, setTemperamento] = useState(animal?.temperamento || '');
  const [historia, setHistoria] = useState(animal?.historia || '');
  const [vacinas, setVacinas] = useState(animal?.vacinas.join(', ') || '');
  const [status, setStatus] = useState(animal?.status || ANIMAL_STATUS.WAITING);

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const animalData = {
      id: animal?.id || Date.now().toString(),
      nome,
      especie: especie as typeof ANIMAL_SPECIE[keyof typeof ANIMAL_SPECIE],
      idade,
      porte: porte as typeof ANIMAL_SIZE[keyof typeof ANIMAL_SIZE],
      temperamento,
      historia,
      foto_url: foto,
      vacinas: vacinas.split(',').map(v => v.trim()).filter(Boolean),
      status: status as typeof ANIMAL_STATUS[keyof typeof ANIMAL_STATUS],
      ...(animal?.nome_adotante && { nome_adotante: animal.nome_adotante }),
      ...(animal?.contato_adotante && { contato_adotante: animal.contato_adotante }),
      ...(animal?.doc_adocao_url && { doc_adocao_url: animal.doc_adocao_url }),
    };

    if (isEditing) {
      logger.info('Editando animal:', animalData);
      // TODO: Chamar API para atualizar animal
      // await apiRequest(`/animals/${animal.id}`, { method: 'PUT', body: animalData });
    } else {
      logger.info('Criando novo animal:', animalData);
      // TODO: Chamar API para criar animal
      // await apiRequest('/animals', { method: 'POST', body: animalData });
    }
    
    onClose();
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
          <div className="md:w-5/12 h-72 md:h-auto flex-shrink-0 bg-stone-100 flex flex-col items-center justify-center gap-4 p-8">
            {foto ? (
              <img src={foto} alt="Pré-visualização" className="w-full h-48 object-cover rounded-2xl shadow-md" />
            ) : (
              <div className="w-full h-48 border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center text-stone-400 gap-2">
                <Upload size={32} />
                <span className="text-sm font-medium">Sem foto</span>
              </div>
            )}
            <input 
              type="text"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm" 
              placeholder="URL da foto" 
            />
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

              <button 
                type="submit" 
                className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all text-lg"
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
