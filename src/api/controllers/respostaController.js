import { RespostasAluno, Avaliacao, Resposta } from '../models/indexModels.js'

const respostaController = {
  enviarRespostas: async (req, res) => {
    const { numeroChamada, numeroTurma, respostas } = req.body

    console.log('Respostas recebidas:', req.body)

    if (!numeroChamada || !numeroTurma || !respostas) {
      return res.status(400).json({ message: 'Dados incompletos' })
    }

    try {
      const avaliacao = await Avaliacao.create({
        numero_chamada: numeroChamada,
        numero_turma: numeroTurma,
      })
      console.log('Avaliação criada com ID:', avaliacao.id)

      let totalAcertos = 0
      const resultados = []

      const promises = Object.entries(respostas).map(
        async ([questaoId, respostaId]) => {
          console.log(
            `Processando questão ID: ${questaoId}, resposta ID: ${respostaId}`
          )

          // Busca a resposta no banco de dados
          const resposta = await Resposta.findOne({
            where: { id: respostaId },
          })

          if (resposta) {
            console.log(
              `Resposta encontrada: ${respostaId}, Correta: ${resposta.correta}`
            )

            // Adiciona o resultado ao array de resultados
            resultados.push({
              questao_id: parseInt(questaoId.replace('questao', ''), 10),
              resposta_id: respostaId,
              correta: resposta.correta,
            })

            // Salva a resposta do aluno na tabela respostas_aluno
            await RespostasAluno.create({
              numero_chamada: numeroChamada,
              numero_turma: numeroTurma,
              avaliacao_id: avaliacao.id,
              questao_id: parseInt(questaoId.replace('questao', ''), 10),
              resposta_id: respostaId,
            })
          }
        }
      )

      await Promise.all(promises)

      // Calcula o total de acertos
      totalAcertos = resultados.filter((res) => res.correta === true).length

      res.json({ resultados, totalAcertos })
    } catch (error) {
      console.error('Erro ao processar respostas:', error)
      res.status(500).json({ error: 'Erro ao processar respostas' })
    }
  },
}

export default respostaController
