import { expect } from 'chai'
import sequelize from '../../config/db.js'
import { Questao } from '../../models/indexModels.js'

describe('Modelo Questao', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Sincroniza o banco de dados antes de cada teste
  })

  afterAll(async () => {
    await sequelize.close() // Fecha a conexão com o banco de dados após os testes
  })

  beforeEach(() => {
    jest.clearAllMocks() // Limpa todos os mocks antes de cada teste
  })

  it('deve criar uma instância de Questao', async () => {
    const questao = await Questao.create({
      enunciado: 'Qual é a capital da França?',
      disciplina: 'Geografia',
    })

    expect(questao).to.be.an('object')
    expect(questao).to.have.property('id')
    expect(questao).to.have.property('enunciado', 'Qual é a capital da França?')
    expect(questao).to.have.property('disciplina', 'Geografia')
  })

  it('não deve criar uma instância de Questao com campos faltando', async () => {
    try {
      await Questao.create({
        enunciado: 'Qual é a capital da França?',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal(
        'Questao.disciplina cannot be null'
      )
    }
  })
})
