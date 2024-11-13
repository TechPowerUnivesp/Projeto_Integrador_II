import { RespostasAluno, Questao, Resposta } from '../models/indexModels.js'

export const getAlunos = async (req, res) => {
  try {
    const { numero_turma, numero_chamada } = req.query
    const whereClause = {}
    if (numero_turma) {
      whereClause.numero_turma = numero_turma
    }
    if (numero_chamada) {
      whereClause.numero_chamada = numero_chamada
    }

    const alunos = await RespostasAluno.findAll({
      attributes: ['numero_chamada', 'numero_turma'],
      where: whereClause,
      group: ['numero_chamada', 'numero_turma'],
    })

    res.json(alunos)
  } catch (error) {
    console.error('Erro ao buscar alunos:', error)
    res.status(500).json({ message: 'Erro ao buscar alunos' })
  }
}

export const getRespostasAluno = async (req, res) => {
  try {
    const { numero_turma, numero_chamada } = req.query
    console.log(
      `Buscando respostas para turma ${numero_turma}, chamada ${numero_chamada}`
    )

    const respostasAluno = await RespostasAluno.findAll({
      where: { numero_turma, numero_chamada },
      include: [
        {
          model: Questao,
          as: 'questao',
          include: [
            {
              model: Resposta,
              as: 'respostas',
            },
          ],
        },
      ],
    })

    res.json(respostasAluno)
  } catch (error) {
    console.error('Erro ao buscar detalhes do aluno:', error)
    res.status(500).json({ message: 'Erro ao buscar detalhes do aluno' })
  }
}
