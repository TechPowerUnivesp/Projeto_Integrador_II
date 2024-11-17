import { expect } from 'chai'
import sinon from 'sinon'
import { Professor } from '../../models/indexModels.js'
import professorController from '../../controllers/professorController.js'

jest.mock('../../models/indexModels.js', () => ({
  Professor: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}))

describe('Professor Controller', () => {
  let req, res

  beforeEach(() => {
    req = {
      body: {},
    }
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    }
  })

  describe('login', () => {
    it('deve fazer login com sucesso com credenciais corretas', async () => {
      req.body = { username: 'testuser', password: 'testpassword' }
      Professor.findOne.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
      })

      await professorController.login(req, res)

      expect(res.status.calledWith(200)).to.be.true
      expect(
        res.json.calledWith({
          success: true,
          message: 'Login bem-sucedido',
        })
      ).to.be.true
    })

    it('deve retornar 401 se o usuário não for encontrado', async () => {
      req.body = { username: 'nonexistentuser', password: 'testpassword' }
      Professor.findOne.mockResolvedValue(null)

      await professorController.login(req, res)

      expect(res.status.calledWith(401)).to.be.true
      expect(
        res.json.calledWith({
          success: false,
          message: 'Usuário não encontrado',
        })
      ).to.be.true
    })

    it('deve retornar 401 se a senha estiver incorreta', async () => {
      req.body = { username: 'testuser', password: 'wrongpassword' }
      Professor.findOne.mockResolvedValue({
        username: 'testuser',
        password: 'testpassword',
      })

      await professorController.login(req, res)

      expect(res.status.calledWith(401)).to.be.true
      expect(
        res.json.calledWith({
          success: false,
          message: 'Senha incorreta',
        })
      ).to.be.true
    })

    it('deve retornar 500 se houver um erro no servidor', async () => {
      req.body = { username: 'testuser', password: 'testpassword' }
      Professor.findOne.mockRejectedValue(new Error('Server error'))

      await professorController.login(req, res)

      expect(res.status.calledWith(500)).to.be.true
      expect(
        res.json.calledWith({
          success: false,
          message: 'Erro no servidor ao fazer login',
        })
      ).to.be.true
    })
  })

  describe('register', () => {
    it('deve registrar com sucesso', async () => {
      req.body = { username: 'newuser', password: 'newpassword' }
      Professor.create.mockResolvedValue({
        username: 'newuser',
        password: 'newpassword',
      })

      await professorController.register(req, res)

      expect(res.status.calledWith(201)).to.be.true
      expect(
        res.json.calledWith({
          success: true,
          message: 'Usuário registrado com sucesso',
        })
      ).to.be.true
    })

    it('deve retornar 500 se houver um erro no servidor durante o registro', async () => {
      req.body = { username: 'newuser', password: 'newpassword' }
      Professor.create.mockRejectedValue(new Error('Server error'))

      await professorController.register(req, res)

      expect(res.status.calledWith(500)).to.be.true
      expect(
        res.json.calledWith({
          success: false,
          message: 'Erro no servidor ao registrar usuário',
        })
      ).to.be.true
    })
  })
})
