import { expect } from 'chai'
import sequelize from '../../config/db.js'
import {
  RespostasAluno,
  Avaliacao,
  Questao,
  Resposta,
} from '../../models/indexModels.js'

describe('Modelo RespostasAluno', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Sincroniza o banco de dados antes de cada teste
  })

  afterAll(async () => {
    await sequelize.close() // Fecha a conexão com o banco de dados após os testes
  })

  beforeEach(() => {
    jest.clearAllMocks() // Limpa todos os mocks antes de cada teste
  })

  it('deve criar uma instância de RespostasAluno', async () => {
    const avaliacao = await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    const resposta = await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    const respostasAluno = await RespostasAluno.create({
      numero_chamada: '123',
      numero_turma: '456',
      avaliacao_id: avaliacao.id,
      questao_id: questao.id,
      resposta_id: resposta.id,
    })

    expect(respostasAluno).to.be.an('object')
    expect(respostasAluno).to.have.property('id')
    expect(respostasAluno).to.have.property('numero_chamada', '123')
    expect(respostasAluno).to.have.property('numero_turma', '456')
    expect(respostasAluno).to.have.property('avaliacao_id', avaliacao.id)
    expect(respostasAluno).to.have.property('questao_id', questao.id)
    expect(respostasAluno).to.have.property('resposta_id', resposta.id)
  })

  it('não deve criar uma instância de RespostasAluno com campos faltando', async () => {
    try {
      await RespostasAluno.create({
        numero_chamada: '123',
        numero_turma: '456',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal(
        'RespostasAluno.avaliacao_id cannot be null'
      )
    }
  })

  it('deve atualizar uma instância de RespostasAluno', async () => {
    const avaliacao = await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    const resposta = await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    const respostasAluno = await RespostasAluno.create({
      numero_chamada: '123',
      numero_turma: '456',
      avaliacao_id: avaliacao.id,
      questao_id: questao.id,
      resposta_id: resposta.id,
    })

    respostasAluno.numero_turma = '789'
    await respostasAluno.save()

    const respostasAlunoAtualizado = await RespostasAluno.findByPk(
      respostasAluno.id
    )
    expect(respostasAlunoAtualizado).to.have.property('numero_turma', '789')
  })

  it('deve excluir uma instância de RespostasAluno', async () => {
    const avaliacao = await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    const resposta = await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    const respostasAluno = await RespostasAluno.create({
      numero_chamada: '123',
      numero_turma: '456',
      avaliacao_id: avaliacao.id,
      questao_id: questao.id,
      resposta_id: resposta.id,
    })

    await respostasAluno.destroy()

    const respostasAlunoExcluido = await RespostasAluno.findByPk(
      respostasAluno.id
    )
    expect(respostasAlunoExcluido).to.be.null
  })
})
