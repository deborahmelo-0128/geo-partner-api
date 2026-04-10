import express from 'express';
import { createPartner } from '../application/CreatePartner';
import { pool } from './db';

const router = express.Router();

// POST - criar parceiro
router.post('/partners', async (req, res) => {
  try {
    await createPartner(req.body);
    res.status(201).json({ message: 'Partner criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar parceiro');
  }
});

// GET - buscar por ID
router.get('/partners/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM partners WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Parceiro não encontrado');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar parceiro');
  }
});

// 🔥 COLE AQUI (NOVA ROTA)
router.get('/search', async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const query = `
      SELECT *, 
      ST_Distance(address, ST_SetSRID(ST_MakePoint($1, $2), 4326)) as distance
      FROM partners
      WHERE ST_Contains(
        coverage_area,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)
      )
      ORDER BY distance
      LIMIT 1
    `;

    const result = await pool.query(query, [lng, lat]);

    if (result.rows.length === 0) {
      return res.status(404).send('Nenhum parceiro encontrado');
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na busca');
  }
});

export default router;