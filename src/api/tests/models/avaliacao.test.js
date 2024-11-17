import { expect } from 'chai'
import sequelize from '../../config/db.js'
import { Avaliacao } from '../../models/indexModels.js'

describe('Modelo Avaliacao', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Sincroniza o banco de dados antes de cada teste
  })

  afterAll(async () => {
    await sequelize.close() // Fecha a conexão com o banco de dados após os testes
  })

  beforeEach(() => {
    jest.clearAllMocks() // Limpa todos os mocks antes de cada teste
  })

  it('deve criar uma instância de Avaliacao', async () => {
    const avaliacao = await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    expect(avaliacao).to.be.an('object')
    expect(avaliacao).to.have.property('id')
    expect(avaliacao).to.have.property('numero_chamada', '123')
    expect(avaliacao).to.have.property('numero_turma', '456')
  })

  it('não deve criar uma instância de Avaliacao com campos faltando', async () => {
    try {
      await Avaliacao.create({
        numero_chamada: '123',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal(
        'Avaliacao.numero_turma cannot be null'
      )
    }
  })

  it('deve atualizar uma instância de Avaliacao', async () => {
    const avaliacao = await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    avaliacao.numero_turma = '789'
    await avaliacao.save()

    const avaliacaoAtualizada = await Avaliacao.findByPk(avaliacao.id)
    expect(avaliacaoAtualizada).to.have.property('numero_turma', '789')
  })

  it('deve excluir uma instância de Avaliacao', async () => {
    const avaliacao = await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    await avaliacao.destroy()

    const avaliacaoExcluida = await Avaliacao.findByPk(avaliacao.id)
    expect(avaliacaoExcluida).to.be.null
  })

  it('não deve criar uma instância de Avaliacao com numero_chamada duplicado', async () => {
    await Avaliacao.create({
      numero_chamada: '123',
      numero_turma: '456',
    })

    try {
      await Avaliacao.create({
        numero_chamada: '123',
        numero_turma: '789',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal(
        'Avaliacao.numero_chamada must be unique'
      )
    }
  })
})
