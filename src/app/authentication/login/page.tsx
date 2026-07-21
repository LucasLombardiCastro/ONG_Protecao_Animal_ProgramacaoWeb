'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
// import { credenciaisMock } from '../../../data/mockData';
import { authService } from '../../../services/authService';
import { sessionStorage } from '../../../utils/api';
import { logger } from '../../../utils/logger';

const LOGIN_DELAY_MS = 500;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    // // Simulate API request delay
    // setTimeout(() => {
    //   const usuarioEncontrado = credenciaisMock.find(
    //     cred => cred.email === email && cred.senha === senha
    //   );

    //   if (usuarioEncontrado) {
    //     logger.info('Login bem-sucedido', { email: usuarioEncontrado.email });
        
    //     sessionStorage.set({
    //       email: usuarioEncontrado.email,
    //       nome: usuarioEncontrado.nome,
    //       dataLogin: new Date().toISOString(),
    //     });
        
    //     router.push('/solicitacoes');
    //   } else {
    //     const errorMsg = 'Email ou senha incorretos. Tente novamente.';
    //     logger.warn('Falha no login', { email });
    //     setErro(errorMsg);
    //     setCarregando(false);
    //   }
    // }, LOGIN_DELAY_MS);

    try {
      const { usuario, token } = await authService.login(email, senha);

      logger.info('Login bem-sucedido', { email: usuario.email });

      sessionStorage.set({
        email: usuario.email,
        nome: usuario.nome,
        dataLogin: new Date().toISOString(),
        token,
      });

      router.push('/solicitacoes');
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Email ou senha incorretos. Tente novamente.';
      logger.warn('Falha no login', { email, error: errorMsg });
      setErro(errorMsg);
      setCarregando(false);
    }
  };

  return (
    <main className="pt-20 pb-20 px-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-orange-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-orange-100 text-orange-600 font-bold px-4 py-2 rounded-full text-sm mb-6">
            Área de Funcionários
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-3">Bem-vindo!</h1>
          <p className="text-stone-600 font-medium">
            Faça login para acessar o painel de gerenciamento
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone-100">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase font-bold text-stone-400 tracking-widest">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="senha" className="text-xs uppercase font-bold text-stone-400 tracking-widest">
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 pr-12 text-stone-800 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                  aria-label="Mostrar/Ocultar senha"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {erro && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 font-medium text-sm">{erro}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-200 mt-6"
            >
              <LogIn size={20} />
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Test Credentials */}
          <div className="mt-8 pt-6 border-t border-stone-200">
            <p className="text-xs text-stone-500 font-medium mb-3">Credenciais de teste:</p>
            <div className="space-y-2 text-xs text-stone-600">
              <p><span className="font-bold">Email:</span> admin@ong.com</p>
              <p><span className="font-bold">Senha:</span> 123456</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-stone-600 hover:text-orange-600 font-medium transition-colors"
          >
            ← Voltar para o início
          </a>
        </div>
      </div>
    </main>
  );
}
