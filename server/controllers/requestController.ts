import { Request, Response } from 'express';
import RequestModel from '../models/Request';

export const requestController = {
  // 1. criar um pedido
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const { tipo, nome, telefone, email, data, notas } = req.body;

      // validação dos campos recebidos
      if (!tipo || !nome || !telefone || !data) {
        res.status(400).json({ mensagem: 'Campos obrigatórios do pedido estão faltando.' });
        return;
      }

      // validações específicas por tipo (adoção ou voluntário)
      if (tipo === 'adocao') {
        const { animal_nome, animal_foto, animal_id } = req.body;
        if (!animal_nome || !animal_foto) {
          res.status(400).json({ mensagem: 'Dados do animal são obrigatórios para adoção.' });
          return;
        }

        const novoPedidoAdocao = await RequestModel.create({
          tipo, nome, telefone, email, data, notas: notas || '',
          animal_nome, animal_foto, animal_id
        });
        res.status(201).json(novoPedidoAdocao);
        return;

      } else if (tipo === 'voluntario') {
        const { disponibilidade, interesse } = req.body;
        if (!disponibilidade || !interesse) {
          res.status(400).json({ mensagem: 'Disponibilidade e interesse são obrigatórios para voluntariado.' });
          return;
        }

        const novoPedidoVoluntario = await RequestModel.create({
          tipo, nome, telefone, email, data, notas: notas || '',
          disponibilidade, interesse
        });
        res.status(201).json(novoPedidoVoluntario);
        return;
      } else if (tipo === 'insumo') {
        const { itens } = req.body;
        if (!itens) {
          res.status(400).json({ mensagem: 'A descrição dos itens é obrigatória para doação de insumos.' });
          return;
        }

        const novoPedidoInsumo = await RequestModel.create({
          tipo, nome, telefone, email, data, notas: notas || '',
          itens
        });
        res.status(201).json(novoPedidoInsumo);
        return;
      }

      res.status(400).json({ mensagem: 'Tipo de pedido inválido.' });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ mensagem: 'Erro interno ao processar o pedido.' });
    }
  },

  // listar pedidos
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const pedidos = await RequestModel.findAll({
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(pedidos);

    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).json({ mensagem: 'Erro interno ao buscar pedidos.' });
    }
  },

  // 3. atualizar status ou notas do pedido
  async atualizarStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status, notas } = req.body;

      const id = req.params.id as string;
      const pedido = await RequestModel.findByPk(Number(id));

      if (!pedido) {
        res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        return;
      }

      // Atualiza apenas o que foi enviado
      if (status) pedido.status = status;
      if (notas !== undefined) pedido.notas = notas;

      await pedido.save();

      res.status(200).json({ mensagem: 'Pedido atualizado com sucesso!', pedido });

    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      res.status(500).json({ mensagem: 'Erro interno ao atualizar status do pedido.' });
    }
  },

  // 4. buscar um pedido específico
  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const pedido = await RequestModel.findByPk(Number(id));

      if (!pedido) {
        res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        return;
      }

      res.status(200).json(pedido);
    } catch (error) {
      console.error('Erro ao buscar detalhe do pedido:', error);
      res.status(500).json({ mensagem: 'Erro interno ao buscar o pedido.' });
    }
  },

//   5. deletar um pedido
  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const pedido = await RequestModel.findByPk(Number(id));

      if (!pedido) {
        res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        return;
      }

      await pedido.destroy();
      res.status(200).json({ mensagem: 'Pedido removido com sucesso!' });

    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
      res.status(500).json({ mensagem: 'Erro interno ao deletar pedido.' });
    }
  }
};