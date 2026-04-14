import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fffaf5]/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 hover:scale-105 transition-transform">
          Vida Animal 🐾
        </Link>
        <div className="flex gap-6 text-sm font-semibold text-stone-600">
          <Link href="/adocao" className="hover:text-orange-400">Adoção</Link>
          <Link href="/doacoes" className="hover:text-orange-400">Como Ajudar</Link>
        </div>
      </div>
    </nav>
  );
}