'use client';
import { Animal } from '../data/mockData';

interface Props {
  animal: Animal;
  onClick: (animal: Animal) => void;
}

export default function AnimalCard({ animal, onClick }: Props) {
  return (
    <div 
      onClick={() => onClick(animal)}
      className="group cursor-pointer space-y-4"
    >
      <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-sm group-hover:shadow-xl transition-all duration-500 translate-y-0 group-hover:-translate-y-2">
        <img 
          src={animal.foto_url} 
          alt={animal.nome} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/80 backdrop-blur-md text-stone-800 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
            {animal.porte}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-medium text-stone-900">{animal.nome}</h3>
        <p className="text-stone-400 text-sm font-light uppercase tracking-widest">{animal.especie} • {animal.idade}</p>
      </div>
    </div>
  );
}