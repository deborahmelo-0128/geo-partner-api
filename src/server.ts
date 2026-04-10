import express from 'express';
import { pool } from './infra/db';

const app = express();

app.use(express.json());

// TESTE DE CONEXÃO COM BANCO 👇
pool.query('SELECT NOW()')
  .then((result: any) => console.log(result.rows))
  .catch((error: any) => console.error(error));
  

// Rota básica
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
import routes from './infra/routes';

app.use(routes);
