import Link from 'next/link';
import PartnerCarousel from '../components/PartnerCarousel';

export default function Home() {
  return (
    <main className="pt-20"> 
      {/* Parte inicial do site */}
      <section className="max-w-7xl mx-auto px-6 pb-12 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 space-y-6">
          <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full text-sm">
            🐾 Encontre seu melhor amigo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-800 leading-tight">
            Eles esperam, <br/>
            <span className="text-orange-500">você transforma!</span>
          </h1>
          <p className="text-lg text-stone-600 font-medium max-w-lg">
            Dê uma chance para quem só tem amor a oferecer. Juntos podemos construir finais felizes para milhares de focinhos!
          </p>
          <div className="flex gap-4 items-center pt-2">
            <Link href="/adocao" className="px-8 py-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all font-bold shadow-lg shadow-orange-200">
              Encontrar um amigo
            </Link>
            <Link href="/doacoes" className="text-orange-600 hover:text-orange-700 font-bold px-4 py-2 hover:bg-orange-50 rounded-2xl transition-all">
              Como ajudar?
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 relative flex justify-center mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-yellow-100 rounded-full blur-2xl -z-10 scale-90"></div>
          <img 
            src="https://png.pngtree.com/png-clipart/20230513/ourmid/pngtree-smile-dog-on-white-background-png-image_7096061.png" 
            alt="Um dos nossos heróis"
            className="w-4/5 h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Carrossel */}
      <section className="py-10 bg-white border-y border-orange-50">
        <div className="text-center mb-6 px-6">
          <h2 className="text-2xl font-bold text-stone-800">Nossos Parceiros</h2>
          <p className="text-stone-500 font-medium text-sm mt-1 max-w-xl mx-auto">
            Eles são lendas! Empresas e clínicas veterinárias incríveis que nos ajudam a manter essa corrente do bem funcionando todos os dias.
          </p>
        </div>
        <PartnerCarousel />
      </section>

      {/* parte do como ajudar */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.pexels.com/photos/31342669/pexels-photo-31342669.jpeg?cs=srgb&dl=pexels-gryziu-31342669.jpg&fm=jpg" alt="Carinho no cachorro" />
            <img src="https://pethelpful.com/.image/NDowMDAwMDAwMDAwMTMxNjYz/happy-dogs-running-free.jpg?io=1&profile=w2560&ar=4-3&x=44&y=47" className="w-full h-48 md:h-56 object-cover rounded-3xl rounded-tr-[4rem] shadow-md hover:scale-105 transition-transform mt-8" alt="Passeando com o pet" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqEX3SnBClYAuMEzMTYJF6X8XnDqTqIamvJg&s" className="w-full h-48 md:h-56 object-cover rounded-3xl rounded-bl-[4rem] shadow-md hover:scale-105 transition-transform -mt-8" alt="Voluntário sorrindo com cachorro" />
            <img src="https://plus.unsplash.com/premium_photo-1718358631714-05d459d32ab8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nJTIwaGFwcHl8ZW58MHx8MHx8fDA%3D" className="w-full h-48 md:h-56 object-cover rounded-3xl rounded-br-[4rem] shadow-md hover:scale-105 transition-transform" alt="Alimentando os animais" />
          </div>
          
          <div className="space-y-6">
            <div className="inline-block bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm">
              Faça a diferença 💚
            </div>
            <h2 className="text-4xl font-bold text-stone-800 leading-tight">
              Um pouquinho do seu amor <br/> salva muitas vidas!
            </h2>
            <p className="text-stone-600 font-medium text-lg leading-relaxed">
              Nossos peludos precisam de ração, remédios e muito carinho. Você pode apoiar nossa ONG de várias formas: doando qualquer valor, trazendo insumos ou dedicando um tempo para brincar com eles no abrigo.
            </p>
            <div className="pt-4">
              <Link href="/doacoes" className="px-8 py-4 bg-stone-800 text-white font-bold rounded-2xl hover:bg-stone-700 hover:-translate-y-1 transition-all shadow-lg inline-flex items-center gap-2">
                Quero ser um herói!
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}