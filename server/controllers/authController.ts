import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Estrutura do payload
interface UserPayload {
  id: number,
  email: string,
}

// função auxiliar para gerar token
const gerarAuthToken = (params = {}) => {
  const secret = process.env.JWT_SECRET || 'chave_desenvolvimento';
  return jwt.sign(params, secret, {
    expiresIn: '15m', 
  });
};

const gerarRefreshToken = (params = {}) => {
  const secret = process.env.JWT_SECRET || 'chave_desenvolvimento';
  return jwt.sign(params, secret, {
    expiresIn: '7d', 
  });
};

export const authController = {

  // 1. validar um token  
  validar(req: Request, res: Response, next: NextFunction): void {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
        return;
    }
    
    if (!token.startsWith('Bearer')) {
        res.status(401).json({ mensagem: 'Token malformatado. Use o padrão Bearer.' });
        return;
    }
    
    token = token.substring(7, token.length);
    
    try {
        const secret = process.env.JWT_SECRET || 'chave_desenvolvimento';
        const decoded = jwt.verify(token, secret);
    
        return next();
    } catch (erro) {
        res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
        return;
    }
  },

  // 2. registrar novo administrador
  async registrar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        return;
      }

      const usuarioExiste = await User.findOne({ where: { email } });

      if (usuarioExiste) {
        res.status(400).json({ mensagem: 'Este e-mail já está cadastrado no sistema.' });
        return;
      }

      // Criptografa a senha antes de salvar
      const senhaHash = await bcrypt.hash(senha, await bcrypt.genSalt());

      const novoUsuario = await User.create({
        nome,
        email,
        senha: senhaHash,
      });

      const usuarioResposta = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      };

      // Refresh token
      const refreshToken = gerarRefreshToken({ id: novoUsuario.id, email: novoUsuario.email });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        usuario: usuarioResposta,
        token: gerarAuthToken({ id: novoUsuario.id, email: novoUsuario.email }),
      });

    } catch (error) {
      console.error('Erro no registro de usuário:', error);
      res.status(500).json({ mensagem: 'Erro interno ao registrar usuário.' });
    }
  },

  // 3. realiza login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
        return;
      }

      const usuario = await User.findOne({ where: { email } });

      if (!usuario) {
        res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
        return;
      }

      // Compara a senha digitada com a senha criptografada do banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
        return;
      }

      const usuarioResposta = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      };

      // Refresh token
      const refreshToken = gerarRefreshToken({ id: usuarioResposta.id, email: usuarioResposta.email });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        usuario: usuarioResposta,
        token: gerarAuthToken({ id: usuario.id, email: usuario.email }),
      });
      
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      res.status(500).json({ mensagem: 'Erro interno ao processar login.' });
    }
  },

  // 4. Faz o refresh
  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      res.status(401).send('Falta refresh token');
      return;
    }

    try {
      const secret = process.env.JWT_SECRET || 'chave_desenvolvimento';
      const decoded = jwt.verify(refreshToken, secret) as UserPayload;
      const token = gerarAuthToken({ id: decoded.id, email: decoded.email });
      res.status(200).send({ token });
    } catch (e) {
      res.status(401).send('Invalid refresh token');
    }
  },

  // 5. logout
  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('refresh_token');
    res.sendStatus(204);
  },
}