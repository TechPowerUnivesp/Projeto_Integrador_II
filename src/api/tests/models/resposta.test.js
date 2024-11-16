import { expect } from 'chai'
import sequelize from '../../config/db.js'
import { Resposta, Questao } from '../../models/indexModels.js'

describe('Modelo Resposta', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Sincroniza o banco de dados antes de cada teste
  })

  afterAll(async () => {
    await sequelize.close() // Fecha a conexão com o banco de dados após os testes
  })

  beforeEach(() => {
    jest.clearAllMocks() // Limpa todos os mocks antes de cada teste
  })

  it('deve criar uma instância de Resposta', async () => {
    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    const resposta = await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    expect(resposta).to.be.an('object')
    expect(resposta).to.have.property('id')
    expect(resposta).to.have.property('texto_resposta', 'Paris')
    expect(resposta).to.have.property('questao_id', questao.id)
    expect(resposta).to.have.property('correta', 1)
  })

  it('não deve criar uma instância de Resposta com campos faltando', async () => {
    try {
      await Resposta.create({
        texto_resposta: 'Paris',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal(
        'Resposta.questao_id cannot be null'
      )
    }
  })

  it('deve atualizar uma instância de Resposta', async () => {
    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    const resposta = await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    resposta.texto_resposta = 'Lyon'
    await resposta.save()

    const respostaAtualizada = await Resposta.findByPk(resposta.id)
    expect(respostaAtualizada).to.have.property('texto_resposta', 'Lyon')
  })

  it('deve excluir uma instância de Resposta', async () => {
    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    const resposta = await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    await resposta.destroy()

    const respostaExcluida = await Resposta.findByPk(resposta.id)
    expect(respostaExcluida).to.be.null
  })

  it('não deve criar uma instância de Resposta com texto_resposta duplicado para a mesma questão', async () => {
    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    await Resposta.create({
      texto_resposta: 'Paris',
      questao_id: questao.id,
      correta: 1,
    })

    try {
      await Resposta.create({
        texto_resposta: 'Paris',
        questao_id: questao.id,
        correta: 0,
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal('texto_resposta must be unique')
    }
  })
})
