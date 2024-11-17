import { expect } from 'chai'
import sinon from 'sinon'
import { Questao, Resposta } from '../../models/indexModels.js'
import questaoController from '../../controllers/questaoController.js'

jest.mock('../../models/indexModels.js', () => ({
  Questao: {
    findAll: jest.fn(),
  },
  Resposta: jest.fn(),
}))

describe('Questao Controller', () => {
  let req, res

  beforeEach(() => {
    req = {
      query: {},
    }
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    }
  })

  describe('getQuestoes', () => {
    it('deve retornar questões com sucesso', async () => {
      const questoes = [
        {
          id: 1,
          enunciado: 'Questão 1',
          disciplina: 'Matemática',
          respostas: [],
        },
        {
          id: 2,
          enunciado: 'Questão 2',
          disciplina: 'Matemática',
          respostas: [],
        },
      ]
      Questao.findAll.mockResolvedValue(questoes)

      await questaoController.getQuestoes(req, res)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(questoes)).to.be.true
    })

    it('deve retornar 500 se houver um erro no servidor ao buscar questões', async () => {
      Questao.findAll.mockRejectedValue(new Error('Server error'))

      await questaoController.getQuestoes(req, res)

      expect(res.status.calledWith(500)).to.be.true
      expect(
        res.json.calledWith(
          sinon.match({
            message: 'Erro ao carregar questões',
          })
        )
      ).to.be.true
    })
  })
})
