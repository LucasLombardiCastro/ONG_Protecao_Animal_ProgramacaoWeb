//declarando uso do next.js
'use client'; 

import { useState, useEffect } from 'react';
// import { animaisMock } from '../../data/mockData';
import { Animal } from '../../types/domain';
import { animalService } from '../../services/animalService';
import AnimalCard from '../../components/AnimalCard';
import AdoptionModal from '../../components/AdoptionModal';
import AnimalFormModal from '../../components/AnimalFormModal';
import { Plus, Edit, Loader2 } from 'lucide-react';
import { ANIMAL_STATUS, ANIMAL_SPECIE } from '../../constants/app';
import { logger } from '../../utils/logger';
import { sessionStorage } from '../../utils/api';


export default function AdocaoPage() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [filtro, setFiltro] = useState('Todos');
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(null);
  const [mostrarNovoAnimal, setMostrarNovoAnimal] = useState(false);
  const [animalEmEdicao, setAnimalEmEdicao] = useState<Animal | null>(null);

  const [logado, setLogado] = useState(false);
  useEffect(() => {
    setLogado(sessionStorage.exists());
  }, []);

  // const disponiveis = animaisMock.filter(
  //   a => a.status === ANIMAL_STATUS.WAITING && (filtro === 'Todos' || a.especie === filtro)
  // );
  // const felizes = animaisMock.filter(a => a.status === ANIMAL_STATUS.ADOPTED);

  const carregarAnimais = async () => {
    setCarregando(true);
    setErro('');

    try {
      const data = await animalService.listAll();
      setAnimais(data);

    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao carregar animais.';
      logger.error('Falha ao listar animais', mensagem);
      setErro(mensagem);

    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarAnimais();
  }, []);

  const handleAnimalAtualizado = (animal: Animal) => {
    setAnimais(animais.map(a => a.id === animal.id ? animal : a));
  }

  const handleAnimalDeletado = (id: string) => {
    setAnimais(animais.filter(a => a.id !== id));
  }

  const disponiveis = animais.filter(
    a => a.status === ANIMAL_STATUS.WAITING && (filtro === 'Todos' || a.especie === filtro)
  );
  const felizes = animais.filter(a => a.status === ANIMAL_STATUS.ADOPTED);

  return (
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-stone-800 text-center">
        Encontre seu novo <span className="text-orange-500 underline decoration-orange-200">melhor amigo</span>
      </h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-16">
        <div className="flex gap-3">
          {['Todos', 'Cão', 'Gato'].map(e => (
            <button 
              key={e} 
              onClick={() => setFiltro(e)} 
              className={`px-8 py-2 rounded-full font-bold transition-all ${filtro === e ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-50 text-orange-400 hover:bg-orange-100'}`}
            >
              {e}
            </button>
          ))}
        </div>

        {logado && (
          <button
            onClick={() => setMostrarNovoAnimal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-stone-800 text-white font-bold rounded-2xl hover:bg-stone-700 hover:-translate-y-1 transition-all shadow-lg"
          >
            <Plus size={20} /> Adicionar Animal
          </button>
        )}
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-center font-medium mb-10">
          {erro}
        </div>
      )}

      {carregando ? (
        <div className="flex justify-center py-20 text-stone-400">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {disponiveis.map(a => (
              <AnimalCard
                key={a.id}
                animal={a}
                onClick={setAnimalSelecionado}
                onEdit={logado ? setAnimalEmEdicao : undefined}
              />
            ))}
          </div>

          {/*Finais felizes*/}
          <section className="mt-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800">Finais Felizes</h2>
              <p className="text-stone-500 font-medium mt-2">Os focinhos que já estão aquecendo novos lares.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {felizes.map(a => (
                <div
                  key={a.id}
                  className="party-hover transition-transform cursor-pointer bg-white p-3 rounded-3xl shadow-sm border border-orange-50 hover:shadow-md group relative"
                  onClick={() => setAnimalSelecionado(a)}
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                    <img src={a.foto_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={a.nome} />
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="bg-white/90 backdrop-blur-sm text-green-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        Novo Lar
                      </span>
                    </div>
                    {logado && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setAnimalEmEdicao(a);
                        }}
                        className="absolute top-2 right-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100"
                        title="Editar animal"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                  </div>
                  <p className="font-bold text-stone-700 text-center text-lg">{a.nome}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {animalSelecionado && <AdoptionModal animal={animalSelecionado} onClose={() => setAnimalSelecionado(null)} />}
      {mostrarNovoAnimal && (
        <AnimalFormModal
          onClose={() => setMostrarNovoAnimal(false)}
          onSaved={carregarAnimais}
        />
      )}
      {animalEmEdicao && (
        <AnimalFormModal
          animal={animalEmEdicao}
          onClose={() => setAnimalEmEdicao(null)}
          onUpdated={handleAnimalAtualizado}
          onDeleted={handleAnimalDeletado}
        />
      )}
    </main>
  );
}    