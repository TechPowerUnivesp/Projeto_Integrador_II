import { expect } from 'chai'
import sequelize from '../../config/db.js'
import { Professor } from '../../models/indexModels.js'

describe('Professor Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }) // Sincroniza o banco de dados antes de cada teste
  })

  afterAll(async () => {
    await sequelize.close() // Fecha a conexão com o banco de dados após os testes
  })

  beforeEach(() => {
    jest.clearAllMocks() // Limpa todos os mocks antes de cada teste
  })

  it('deve criar uma instância de Professor', async () => {
    const professor = await Professor.create({
      username: 'testuser',
      password: 'testpassword',
    })

    expect(professor).to.be.an('object')
    expect(professor).to.have.property('id')
    expect(professor).to.have.property('username', 'testuser')
    expect(professor).to.have.property('password', 'testpassword')
  })

  it('não deve criar uma instância de Professor com dados faltantes', async () => {
    try {
      await Professor.create({
        username: 'testuser',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal(
        'professor.password cannot be null'
      )
    }
  })

  it('não deve criar uma instância de Professor com nome de usuário duplicado', async () => {
    try {
      await Professor.create({
        username: 'testuser',
        password: 'testpassword',
      })
      await Professor.create({
        username: 'testuser',
        password: 'anotherpassword',
      })
    } catch (error) {
      expect(error).to.be.an('error')
      expect(error.errors[0].message).to.equal('username must be unique')
    }
  })

  it('não deve encontrar uma instância de Professor com nome de usuário inexistente', async () => {
    const professorEncontrado = await Professor.findOne({
      where: { username: 'nonexistentuser' },
    })

    expect(professorEncontrado).to.be.null
  })
})
