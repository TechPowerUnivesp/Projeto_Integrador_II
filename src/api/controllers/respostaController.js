import RespostasAluno from '../models/RespostasAluno.js'
import Avaliacao from '../models/Avaliacao.js'
import Questao from '../models/Questao.js'

const respostaController = {
  enviarRespostas: async (req, res) => {
    const { numeroChamada, numeroTurma, respostas } = req.body

    try {
      // Cria uma nova avaliação
      const avaliacao = await Avaliacao.create({
        numero_chamada: numeroChamada,
        numero_turma: numeroTurma,
      })

      // Salva as respostas na tabela respostas_aluno
      for (const [perguntaKey, resposta_id] of Object.entries(respostas)) {
        const questao_id = parseInt(perguntaKey.replace('pergunta', ''), 10) // Extrai o ID da questão e converte para inteiro
        if (isNaN(questao_id) || questao_id <= 0) {
          throw new Error(`Invalid questao_id extracted from ${perguntaKey}`)
        }

        // Verifica se a questão existe no banco de dados
        const questaoExiste = await Questao.findByPk(questao_id)
        if (!questaoExiste) {
          throw new Error(`Questao with id ${questao_id} does not exist`)
        }

        await RespostasAluno.create({
          numero_chamada: numeroChamada,
          numero_turma: numeroTurma,
          avaliacao_id: avaliacao.id,
          questao_id: questao_id, // Certifique-se de que o ID da questão é um inteiro válido
          resposta_id: parseInt(resposta_id, 10), // Converte para inteiro
        })
      }

      res.status(200).json({ message: 'Respostas enviadas com sucesso' })
    } catch (error) {
      console.error('Erro ao enviar respostas:', error)
      res.status(500).json({ message: 'Erro ao enviar respostas' })
    }
  },
}

export default respostaController
