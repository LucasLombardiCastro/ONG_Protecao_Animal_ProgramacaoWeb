import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from '../server/config/database';
import '../server/models/Animal.ts';
import '../server/models/Request.ts';
import '../server/models/User.ts';
import routes from '../server/routes/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// sincronização do banco
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado.');
}).catch((err: unknown) => {
  console.error('Erro ao sincronizar banco:', err);
});

export default app;
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor Express puro rodando na porta ${PORT}`);
// });