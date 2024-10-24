import Questao from '../models/Questao.js'
import Resposta from '../models/Resposta.js'
import Sequelize from 'sequelize'

const questaoController = {
  getQuestoes: async (req, res) => {
    const { disciplina } = req.query // Mantendo apenas a disciplina

    try {
      const whereClause =
        disciplina && disciplina !== 'todas' ? { disciplina } : {}

      const limit = 5 // Limite fixo como 5

      const questoes = await Questao.findAll({
        where: whereClause,
        include: [
          {
            model: Resposta,
            as: 'respostas',
          },
        ],
        order: Sequelize.literal('RAND()'), // Ajustando para aleatório
        limit, // Usando o limite fixo
      })

      res.status(200).json(questoes)
    } catch (error) {
      console.error('Erro ao carregar questões:', error)
      res.status(500).json({ message: 'Erro ao carregar questões' })
    }
  },
}

export default questaoController
