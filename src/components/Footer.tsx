import { Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-orange-50 border-t border-orange-100 py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-orange-500 mb-2">Vida Animal 🐾</h3>
          <p className="text-stone-500 text-sm">Cuidando de patinhas desde 2020.</p>
        </div>
        
        <div className="flex gap-8 text-stone-600">
          <a href="#" className="hover:text-orange-500 transition-colors"><Phone size={20} /></a>
          <a href="#" className="hover:text-orange-500 transition-colors"><Mail size={20} /></a>
        </div>

        <p className="text-xs text-stone-400 flex items-center gap-1">
          Feito com <Heart size={12} className="fill-orange-400 text-orange-400" /> por voluntários.
        </p>
      </div>
    </footer>
  );
}