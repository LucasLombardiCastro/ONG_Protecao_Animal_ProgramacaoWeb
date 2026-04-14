import { parceirosMock } from '../data/mockData';

export default function PartnerCarousel() {
  const duplicados = [...parceirosMock, ...parceirosMock, ...parceirosMock];

  return (
    <div className="relative overflow-hidden w-full py-10 bg-white">
      <div className="animate-infinite-scroll flex items-center">
        {duplicados.map((p, i) => (
          <div key={i} className="flex-none w-[40vw] md:w-[20vw] flex justify-center px-8">
            <img 
              src={p.imagem_url} 
              alt={p.nome} 
              className="h-16 md:h-20 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}