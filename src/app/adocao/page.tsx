'use client';
import React, { useState } from 'react';
import { animaisMock, Animal } from '../../data/mockData';
import AnimalCard from '../../components/AnimalCard';
import AdoptionModal from '../../components/AdoptionModal';

export default function AdocaoPage() {
  const [filtro, setFiltro] = useState('Todos');
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(null);

  const disponiveis = animaisMock.filter(a => a.status === 'Esperando por um lar' && (filtro === 'Todos' || a.especie === filtro));
  const felizes = animaisMock.filter(a => a.status === 'Final feliz');

  return (
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-stone-800 text-center">
        Encontre seu novo <span className="text-orange-500 underline decoration-orange-200">melhor amigo</span>
      </h1>
      
      <div className="flex justify-center gap-3 mb-16">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {disponiveis.map(a => <AnimalCard key={a.id} animal={a} onClick={setAnimalSelecionado} />)}
      </div>

      {/* Seção Finais Felizes (Design Polaroid fofo e minimalista sem emojis) */}
      <section className="mt-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800">Finais Felizes</h2>
          <p className="text-stone-500 font-medium mt-2">Os focinhos que já estão aquecendo novos lares.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {felizes.map(a => (
            <div 
              key={a.id} 
              className="party-hover transition-transform cursor-pointer bg-white p-3 rounded-3xl shadow-sm border border-orange-50 hover:shadow-md group"
              onClick={() => setAnimalSelecionado(a)}
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <img src={a.foto_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={a.nome} />
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="bg-white/90 backdrop-blur-sm text-green-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Novo Lar
                  </span>
                </div>
              </div>
              <p className="font-bold text-stone-700 text-center text-lg">{a.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {animalSelecionado && <AdoptionModal animal={animalSelecionado} onClose={() => setAnimalSelecionado(null)} />}
    </main>
  );
}