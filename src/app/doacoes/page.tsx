'use client';
import React, { useState } from 'react';
import { Heart, Package, Shield, ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

export default function DoacoesPage() {
  const [formAberto, setFormAberto] = useState<'insumos' | 'voluntariado' | null>(null);
  const [sucesso, setSucesso] = useState('');

  const handleEnviar = (e: React.ChangeEvent) => {
    e.preventDefault();
    setSucesso('Recebemos sua mensagem com sucesso! Entraremos em contato em breve.');
    setTimeout(() => setSucesso(''), 4000);
  };

  return (
    <main className="pt-24 pb-20 px-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4 pb-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-800">Como você quer ajudar?</h1>
            <img 
              src="https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2023/05/30/375562427-protecao-animal.jpg" 
              alt="Cachorrinho feliz" 
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-orange-100 shadow-md hover:scale-105 transition-transform"
            />
          </div>
          <p className="text-stone-500 font-medium text-lg max-w-lg pt-2">
            Escolha uma das opções abaixo e nos ajude a transformar a vida de dezenas de focinhos!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <a href="#pix" className="p-4 bg-white border border-stone-200 rounded-2xl hover:border-orange-400 transition-all flex flex-col items-center gap-2 shadow-sm">
            <Heart className="text-orange-400" size={24} /> <span className="font-medium text-stone-700">PIX</span>
          </a>
          <a href="#insumos" className="p-4 bg-white border border-stone-200 rounded-2xl hover:border-orange-400 transition-all flex flex-col items-center gap-2 shadow-sm">
            <Package className="text-orange-400" size={24} /> <span className="font-medium text-stone-700">Insumos</span>
          </a>
          <a href="#voluntario" className="p-4 bg-white border border-stone-200 rounded-2xl hover:border-orange-400 transition-all flex flex-col items-center gap-2 shadow-sm">
            <Shield className="text-orange-400" size={24} /> <span className="font-medium text-stone-700">Ser Voluntário</span>
          </a>
        </div>
      </div>

      <div className="space-y-6">
        {/* PIX */}
        <section id="pix" className="bg-white p-8 rounded-3xl border border-stone-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm scroll-mt-24">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-stone-800">Doação via PIX</h2>
            <p className="text-stone-500 font-medium max-w-sm">Use o valor para custear ração e idas ao veterinário.</p>
            <div className="inline-flex items-center gap-4 pt-2">
              <span className="font-mono text-orange-600 font-bold bg-orange-50 px-4 py-2 rounded-xl">vida.animal@pix.org</span>
              <button className="text-xs font-bold uppercase bg-stone-100 text-stone-600 px-4 py-2 rounded-xl hover:bg-stone-200 transition-all">Copiar</button>
            </div>
          </div>
          <img src="https://placehold.co/150x150/white/orange?text=QR+CODE" className="w-32 h-32 opacity-70 rounded-xl border border-stone-100" alt="QR Code" />
        </section>

        {/* Itens para doação */}
        <section id="insumos" className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm scroll-mt-24 transition-all">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setFormAberto(formAberto === 'insumos' ? null : 'insumos')}>
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3"><Package className="text-orange-400" /> Doar Insumos</h2>
            <button className="text-stone-400 hover:text-stone-800 transition-colors bg-stone-50 p-2 rounded-full">
              {formAberto === 'insumos' ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {formAberto === 'insumos' && (
            <div className="pt-8 space-y-8 animate-in slide-in-from-top-4">
              <p className="text-stone-600 font-medium border-l-4 border-orange-400 pl-4 bg-orange-50/50 py-2 rounded-r-xl">
                Aceitamos ração de boa qualidade, remédios para pulgas, caminhas e cobertores limpos em nossa sede.
              </p>
              
              {sucesso ? <div className="bg-green-50 text-green-700 p-4 rounded-xl font-medium text-center">{sucesso}</div> : (
                <form className="space-y-4" onSubmit={handleEnviar}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none transition-colors" placeholder="Qual seu nome?" required />
                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none transition-colors" placeholder="Telefone de contato" required />
                  </div>
                  <input className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none transition-colors" placeholder="O que você gostaria de nos entregar?" required />
                  <button className="bg-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-orange-600 transition-all w-full md:w-auto">Combinar entrega</button>
                </form>
              )}
            </div>
          )}
        </section>

        {/* Voluntário */}
        <section id="voluntario" className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm scroll-mt-24 transition-all">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setFormAberto(formAberto === 'voluntariado' ? null : 'voluntariado')}>
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3"><Shield className="text-orange-400" /> Seja um Herói</h2>
            <button className="text-stone-400 hover:text-stone-800 transition-colors bg-stone-50 p-2 rounded-full">
              {formAberto === 'voluntariado' ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          {formAberto === 'voluntariado' && (
            <div className="pt-8 space-y-8 animate-in slide-in-from-top-4">
              <p className="text-stone-600 font-medium leading-relaxed max-w-3xl">
                Você não precisa de superpoderes, apenas de um pouco de tempo livre e disposição. Limpar os canis, passear com os cães, ajudar nas feirinhas de adoção ou tirar boas fotos para o Instagram: toda ajuda muda o destino deles.
              </p>

              {/* Fotos e vídeo */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Vídeo */}
                <div className="md:w-2/3 aspect-video bg-stone-900 rounded-3xl relative overflow-hidden group shadow-inner cursor-pointer flex-shrink-0">
                  <img src="https://images.squarespace-cdn.com/content/v1/5d2d2868fca61000017073bb/1767379538970-6UTWMX5LWQC4QV3XF2DK/DSC_0663.jpg?format=1000w" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" alt="Capa do Vídeo" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg mb-2" />
                    <span className="text-white font-bold text-lg drop-shadow-md">Assista como é ser voluntário</span>
                  </div>
                </div>
                
                {/* fotos */}
                <div className="md:w-1/3 flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
                  <img src="https://freedomservicedogs.org/wp-content/uploads/2024/09/DSC01069.jpg" className="w-48 md:w-full h-24 md:h-[calc(50%-0.5rem)] object-cover rounded-2xl flex-none" alt="Passeio" />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9kC043rqHHdElQGtQBbIZKX5VUE4xf0ca0g&s" className="w-48 md:w-full h-24 md:h-[calc(50%-0.5rem)] object-cover rounded-2xl flex-none" alt="Equipe" />
                </div>
              </div>

              {sucesso ? <div className="bg-green-50 text-green-700 p-4 rounded-xl font-medium text-center">{sucesso}</div> : (
                <form className="space-y-4" onSubmit={handleEnviar}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none transition-colors" placeholder="Nome completo" required />
                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none transition-colors" placeholder="Telefone / WhatsApp" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none transition-colors" placeholder="Quais dias você tem livres?" required />
                    <select className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-600 focus:border-orange-500 focus:outline-none cursor-pointer" required defaultValue="">
                      <option value="" disabled>Como gostaria de ajudar?</option>
                      <option value="limpeza">Mão na massa (Limpeza/Organização)</option>
                      <option value="passeio">Lazer (Passeio e brincadeiras)</option>
                      <option value="eventos">Eventos (Feirinhas de Adoção)</option>
                      <option value="qualquer">Onde for necessário!</option>
                    </select>
                  </div>
                  <button className="bg-stone-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-stone-900 transition-all w-full md:w-auto mt-2">Quero me inscrever</button>
                </form>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}