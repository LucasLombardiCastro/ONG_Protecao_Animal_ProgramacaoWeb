import { Request, Response } from 'express';
import Animal from "../models/Animal";

export const animalController = {
  // 1. listar todos os animais
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const animais = await Animal.findAll({
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json(animais);

    } catch (error) {
      console.error('Erro ao listar animais:', error);
      res.status(500).json({ mensagem: 'Erro interno ao buscar animais.' });
    }
  },

  // 2. buscar um animal pelo id
  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const animal = await Animal.findByPk(id);

      if (!animal) {
        res.status(404).json({ mensagem: 'Animal não encontrado.' });
        return;
      }

      res.status(200).json(animal);

    } catch (error) {
      console.error('Erro ao buscar animal:', error);
      res.status(500).json({ mensagem: 'Erro interno ao buscar o animal.' });
    }
  },

  // 3. cadastrar um novo animal
  async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const {
        nome,
        especie,
        porte,
        historia,
        foto_url,
        idade,
        temperamento,
        vacinas,
      } = req.body;

      // Validação de campos obrigatórios
      if (!nome || !especie || !porte || !historia || !foto_url || !idade || !temperamento) {
        res.status(400).json({ mensagem: 'Por favor, preencha todos os campos obrigatórios.' });
        return;
      }

      const novoAnimal = await Animal.create({
        nome,
        especie,
        porte,
        historia,
        foto_url,
        idade,
        temperamento,
        vacinas: vacinas || [], // te não enviar vacinas, salva como array vazio
        status: 'Disponível',  // todo animal inicia como disponível por padrão
      });

      res.status(201).json(novoAnimal);

    } catch (error: any) {
      console.error('Erro ao cadastrar animal:', error);

      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ mensagem: 'Dados inválidos passados para espécie ou porte.' });
        return;
      }
      res.status(500).json({ mensagem: 'Erro interno ao cadastrar animal.' });
    }
  },

  // 4. atualizar dados de um animal
  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const animal = await Animal.findByPk(id);

      if (!animal) {
        res.status(404).json({ mensagem: 'Animal não encontrado.' });
        return;
      }

      // atualiza o banco com o que vier no corpo da requisição
      await animal.update(req.body);

      res.status(200).json({ mensagem: 'Animal atualizado com sucesso!', animal });

    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      res.status(500).json({ mensagem: 'Erro interno ao atualizar animal.' });
    }
  },

  // 5. deletar um animal
  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const animal = await Animal.findByPk(id);

      if (!animal) {
        res.status(404).json({ mensagem: 'Animal não encontrado.' });
        return;
      }

      await animal.destroy();
      res.status(200).json({ mensagem: 'Animal removido com sucesso!' });
      
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
      res.status(500).json({ mensagem: 'Erro interno ao deletar animal.' });
    }
  },
};