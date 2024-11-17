import { expect } from 'chai'
import sinon from 'sinon'
import {
  getAlunos,
  getRespostasAluno,
} from '../../controllers/respostasAlunosController.js'
import { RespostasAluno, Questao, Resposta } from '../../models/indexModels.js'

describe('Controller Tests', () => {
  afterEach(() => {
    sinon.restore() // Restaura os mocks após cada teste
  })

  describe('getAlunos', () => {
    it('deve retornar uma lista de alunos agrupados por número de chamada e turma', async () => {
      const mockAlunos = [
        { numero_chamada: 1, numero_turma: 'A' },
        { numero_chamada: 2, numero_turma: 'B' },
      ]
      const findAllStub = sinon
        .stub(RespostasAluno, 'findAll')
        .resolves(mockAlunos)

      const req = { query: { numero_turma: 'A' } }
      const res = {
        json: sinon.spy(),
      }

      await getAlunos(req, res)

      expect(findAllStub.calledOnce).to.be.true
      expect(findAllStub.args[0][0]).to.deep.equal({
        attributes: ['numero_chamada', 'numero_turma'],
        where: { numero_turma: 'A' },
        group: ['numero_chamada', 'numero_turma'],
      })
      expect(res.json.calledOnce).to.be.true
      expect(res.json.args[0][0]).to.deep.equal(mockAlunos)
    })

    it('deve lidar com erros e retornar 500', async () => {
      const findAllStub = sinon
        .stub(RespostasAluno, 'findAll')
        .rejects(new Error('Erro simulado'))

      const req = { query: {} }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      }

      await getAlunos(req, res)

      expect(findAllStub.calledOnce).to.be.true
      expect(res.status.calledOnceWith(500)).to.be.true
      expect(res.json.calledOnceWith({ message: 'Erro ao buscar alunos' })).to
        .be.true
    })
  })

  describe('getRespostasAluno', () => {
    it('deve retornar respostas detalhadas do aluno', async () => {
      const mockRespostasAluno = [
        {
          numero_turma: 'A',
          numero_chamada: 1,
          questao: {
            id: 1,
            texto: 'Questão de exemplo',
            respostas: [{ id: 1, texto: 'Resposta 1' }],
          },
        },
      ]
      const findAllStub = sinon
        .stub(RespostasAluno, 'findAll')
        .resolves(mockRespostasAluno)

      const req = { query: { numero_turma: 'A', numero_chamada: 1 } }
      const res = {
        json: sinon.spy(),
      }

      await getRespostasAluno(req, res)

      expect(findAllStub.calledOnce).to.be.true
      expect(findAllStub.args[0][0]).to.deep.equal({
        where: { numero_turma: 'A', numero_chamada: 1 },
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
      expect(res.json.calledOnce).to.be.true
      expect(res.json.args[0][0]).to.deep.equal(mockRespostasAluno)
    })

    it('deve lidar com erros e retornar 500', async () => {
      const findAllStub = sinon
        .stub(RespostasAluno, 'findAll')
        .rejects(new Error('Erro simulado'))

      const req = { query: {} }
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      }

      await getRespostasAluno(req, res)

      expect(findAllStub.calledOnce).to.be.true
      expect(res.status.calledOnceWith(500)).to.be.true
      expect(
        res.json.calledOnceWith({ message: 'Erro ao buscar detalhes do aluno' })
      ).to.be.true
    })
  })
})
