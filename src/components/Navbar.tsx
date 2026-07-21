'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogIn, LogOut, ClipboardList, Menu, X } from 'lucide-react';
import { sessionStorage } from '../utils/api';
import { authService } from '../services/authService';

const LINKS = [
  { href: '/adocao', label: 'Adoção' },
  { href: '/doacoes', label: 'Como Ajudar' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logado, setLogado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // reavalia login e fecha o menu mobile a cada troca de rota
  useEffect(() => {
    setLogado(sessionStorage.exists());
    setMenuAberto(false);
  }, [pathname]);

  const handleLogout = () => {
    try {
      authService.logout();
    } catch {
      // ignora o erro, se falhar desloga localmente
    } finally {
      sessionStorage.clear();
      setLogado(false);
      setMenuAberto(false);
      router.push('/');
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fffaf5]/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500 hover:scale-105 transition-transform">
          Vida Animal 🐾
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="flex gap-6 text-sm font-semibold text-stone-600">
            {LINKS.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-orange-400">
                {link.label}
              </Link>
            ))}
          </div>

          {logado ? (
            <>
              <Link
                href="/solicitacoes"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-200"
                title="Área Interna"
              >
                <ClipboardList size={20} />
                Solicitações
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all"
                title="Sair"
              >
                <LogOut size={20} />
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/authentication/login"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-200"
              title="Login de Funcionários"
            >
              <LogIn size={20} />
              Entrar
            </Link>
          )}
        </div>

        {/* Hambúrguer — só no mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="md:hidden p-2 text-stone-600 hover:text-orange-500 transition-colors"
          aria-label="Abrir menu"
        >
          {menuAberto ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu mobile (dropdown vertical) */}
      {menuAberto && (
        <div className="md:hidden border-t border-orange-100 bg-[#fffaf5] px-6 py-4 flex flex-col gap-3">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-stone-600 font-semibold py-2 hover:text-orange-400"
            >
              {link.label}
            </Link>
          ))}

          {logado ? (
            <>
              <Link
                href="/solicitacoes"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all"
              >
                <ClipboardList size={20} /> Solicitações
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all"
              >
                <LogOut size={20} /> Sair
              </button>
            </>
          ) : (
            <Link
              href="/authentication/login"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all"
            >
              <LogIn size={20} /> Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}