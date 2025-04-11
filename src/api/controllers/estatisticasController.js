import db from '../config/db.js';
import { QueryTypes } from 'sequelize';

const EstatisticasController = {
  async obterEstatisticas(req, res) {
    try {
      // Using parameterized query to prevent SQL injection
      const resultadosGerais = await db.query(`
        SELECT 
          ra.numero_turma, 
          q.disciplina AS tematica,
          SUM(CASE WHEN r.correta = TRUE THEN 1 ELSE 0 END) AS acertos,
          SUM(CASE WHEN r.correta = FALSE THEN 1 ELSE 0 END) AS erros
        FROM 
          respostas_aluno ra
        JOIN 
          resposta r ON ra.resposta_id = r.id
        JOIN 
          questao q ON ra.questao_id = q.id
        GROUP BY 
          ra.numero_turma, q.disciplina
        ORDER BY 
          ra.numero_turma, q.disciplina
      `, {
        type: QueryTypes.SELECT
      });

      // If no results found, return empty array with appropriate message
      if (!resultadosGerais || resultadosGerais.length === 0) {
        return res.json({
          ConsultaGeral: [],
          message: 'Nenhuma estatística encontrada'
        });
      }

      // Ensure numeric values are properly formatted
      const formattedResults = resultadosGerais.map(result => ({
        ...result,
        acertos: parseInt(result.acertos) || 0,
        erros: parseInt(result.erros) || 0
      }));

      res.json({
        ConsultaGeral: formattedResults
      });

    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      res.status(500).json({ 
        erro: 'Erro ao buscar estatísticas',
        message: error.message 
      });
    }
  }
};

export default EstatisticasController;