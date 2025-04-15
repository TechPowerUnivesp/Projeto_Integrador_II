import express from 'express';
import EstatisticasController from '../controllers/estatisticasController.js';

const router = express.Router();

// Rota para obter as estatísticas
router.get('/estatisticas', EstatisticasController.obterEstatisticas);

export default router;
