import { Router } from 'express';
import { Request, Response } from 'express';
import { animalController } from '../controllers/animalController';
import { requestController } from '../controllers/requestController';
import { authController } from '../controllers/authController';

const router = Router();

// Rota de teste
// router.get('/health', (req: Request, res: Response) => {
//   res.status(200).json({ status: 'API rodando perfeitamente!' });
// });


router.get('/animais', animalController.listar);
router.get('/animais/:id', animalController.buscarPorId);
router.post('/animais', authController.validar, animalController.cadastrar);
router.put('/animais/:id', authController.validar, animalController.atualizar);
router.delete('/animais/:id', authController.validar, animalController.deletar);

router.post('/requests', requestController.criar);
router.get('/requests', authController.validar, requestController.listar);
router.get('/requests/:id', authController.validar, requestController.buscarPorId);
router.put('/requests/:id', authController.validar, requestController.atualizarStatus); 
router.delete('/requests/:id', authController.validar, requestController.deletar);

router.post('/auth/register', authController.registrar);
router.post('/auth/login', authController.login);
router.get('/auth/logout', authController.logout);
router.get('/auth/refresh', authController.refresh);


export default router;