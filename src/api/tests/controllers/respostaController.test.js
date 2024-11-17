import { expect } from 'chai'
import sinon from 'sinon'
import respostaController from '../../controllers/respostaController.js'
import {
  RespostasAluno,
  Avaliacao,
  Resposta,
} from '../../models/indexModels.js'
import mockConsole from 'jest-mock-console'
import sequelize from '../../config/db.js'

describe('respostaController.enviarRespostas', () => {
  let req, res, next

  beforeEach(() => {
    mockConsole()

    req = {
      body: {},
    }

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    next = sinon.stub()

    sinon.stub(Avaliacao, 'create')
    sinon.stub(Resposta, 'findOne')
    sinon.stub(RespostasAluno, 'create')
  })

  afterEach(() => {
    sinon.restore()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('deve retornar status 400 se os dados forem incompletos', async () => {
    req.body = { numeroChamada: null, numeroTurma: 1, respostas: {} }

    await respostaController.enviarRespostas(req, res)

    expect(res.status.calledWith(400)).to.be.true
    expect(res.json.calledWith({ message: 'Dados incompletos' })).to.be.true
  })

  it('deve criar uma avaliação e processar as respostas corretamente', async () => {
    req.body = {
      numeroChamada: 1,
      numeroTurma: 1,
      respostas: { questao1: 101, questao2: 102 },
    }

    Avaliacao.create.resolves({ id: 1 })
    Resposta.findOne.onFirstCall().resolves({ id: 101, correta: 1 })
    Resposta.findOne.onSecondCall().resolves({ id: 102, correta: 0 })
    RespostasAluno.create.resolves()

    await respostaController.enviarRespostas(req, res)

    expect(Avaliacao.create.calledOnce).to.be.true
    expect(Resposta.findOne.callCount).to.equal(2)
    expect(RespostasAluno.create.callCount).to.equal(2)

    expect(res.json.calledOnce).to.be.true
    expect(res.json.firstCall.args[0]).to.deep.equal({
      resultados: [
        { questao_id: 1, resposta_id: 101, correta: 1 },
        { questao_id: 2, resposta_id: 102, correta: 0 },
      ],
      totalAcertos: 1,
    })
  })

  it('deve retornar status 500 em caso de erro', async () => {
    req.body = {
      numeroChamada: 1,
      numeroTurma: 1,
      respostas: { questao1: 101 },
    }

    Avaliacao.create.rejects(new Error('Erro no banco de dados'))

    await respostaController.enviarRespostas(req, res)

    expect(res.status.calledWith(500)).to.be.true
    expect(res.json.calledWith({ error: 'Erro ao processar respostas' })).to.be
      .true
  })
})
