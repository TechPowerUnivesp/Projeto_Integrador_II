import {
  RespostasAluno,
  Avaliacao,
  Questao,
  Resposta,
} from '../models/indexModels.js'

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
        async ([perguntaKey, resposta_id]) => {
          const questao_id = parseInt(perguntaKey.replace('questao', ''), 10)
          console.log(
            `Processando questão ID: ${questao_id}, resposta ID: ${resposta_id}`
          )

          const questaoExiste = await Questao.findByPk(questao_id)
          if (!questaoExiste) {
            console.log(`Questão com ID ${questao_id} não encontrada`)
            return
          }

          const resposta = await Resposta.findByPk(resposta_id)
          if (!resposta) {
            console.log(`Resposta com ID ${resposta_id} não encontrada`)
            return
          }

          const correta = resposta.Correta === 1
          console.log(
            `Resposta encontrada: ${resposta_id}, Correta: ${correta}`
          )

          if (correta) {
            totalAcertos++
          }

          resultados.push({
            questao_id,
            resposta_id,
            correta,
          })

          await RespostasAluno.create({
            numero_chamada: numeroChamada,
            numero_turma: numeroTurma,
            avaliacao_id: avaliacao.id,
            questao_id: questao_id,
            resposta_id: parseInt(resposta_id, 10),
            correta,
          })
        }
      )

      await Promise.all(promises)

      console.log('Respostas processadas com sucesso')
      res.status(200).json({
        message: 'Respostas enviadas com sucesso',
        resultados,
        totalAcertos,
      })
    } catch (error) {
      console.error('Erro ao enviar respostas:', error)
      res.status(500).json({ message: 'Erro ao enviar respostas' })
    }
  },
}

export default respostaController
