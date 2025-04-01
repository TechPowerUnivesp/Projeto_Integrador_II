import db from '../config/db.js'; // Importa a conexão com o banco de dados

const EstatisticasController = {
  async obterEstatisticas(req, res) {
    try {
      // Consulta para obter os acertos e erros gerais por turma
      const [resultadosGerais] = await db.query(`
        SELECT numero_turma, 
       questao.disciplina AS tematica,
       SUM(CASE WHEN resposta.Correta = 1 THEN 1 ELSE 0 END) AS acertos,
       SUM(CASE WHEN resposta.Correta = 0 THEN 1 ELSE 0 END) AS erros
FROM respostas_aluno
JOIN resposta ON respostas_aluno.resposta_id = resposta.ID
JOIN questao ON respostas_aluno.questao_id = questao.id
GROUP BY numero_turma, questao.disciplina

      `);

      res.json({
        ConsultaGeral: resultadosGerais
      });

    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      res.status(500).json({ erro: 'Erro ao buscar estatísticas' });
    }
  }
};

export default EstatisticasController;
