import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Formulario.css'

function Formulario() {
  const [numeroChamada, setNumeroChamada] = useState('')
  const [numeroTurma, setNumeroTurma] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [questoes, setQuestoes] = useState([])
  const [loading, setLoading] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [resultados, setResultados] = useState([])
  const [totalAcertos, setTotalAcertos] = useState(0)
  const [mostrarResultados, setMostrarResultados] = useState(false)
  const [respostasUsuario, setRespostasUsuario] = useState({})

  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleDisciplinaChange = (event) => {
    setDisciplina(event.target.value)
  }

  const handleDisciplinaSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const url =
      disciplina === 'todas'
        ? `http://localhost:3001/api/questoes`
        : `http://localhost:3001/api/questoes?disciplina=${disciplina}`

    try {
      const response = await axios.get(url)
      setQuestoes(response.data)
    } catch (error) {
      console.error('Erro ao carregar questões:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (enviando) return

    setEnviando(true)

    // Obter as respostas do usuário
    const respostas = {}
    questoes.forEach((questao) => {
      const respostaSelecionada = document.querySelector(
        `input[name="questao${questao.id}"]:checked`
      )
      if (respostaSelecionada) {
        respostas[questao.id] = respostaSelecionada.value
      }
    })

    const payload = {
      numeroChamada,
      numeroTurma,
      respostas,
    }

    try {
      // Enviar as respostas e receber os resultados
      const response = await axios.post(
        'http://localhost:3001/api/respostas',
        payload
      )

      // Armazenar os resultados no estado para verificação
      setMensagemSucesso('Respostas enviadas com sucesso!')
      setResultados(response.data.resultados || [])
      setTotalAcertos(response.data.totalAcertos || 0)
      setRespostasUsuario(respostas)
      setMostrarResultados(true)
    } catch (error) {
      console.error('Erro ao enviar respostas:', error)
      setMensagemSucesso('Erro ao enviar respostas. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  const getOptionLetter = (index) => String.fromCharCode(65 + index)

  const isRespostaCorreta = (questaoId, respostaId) => {
    console.log('Verificando questão:', questaoId, 'resposta:', respostaId)
    console.log('Resultados:', resultados)
    const resultado = resultados.find(
      (res) =>
        res.questao_id === parseInt(questaoId) &&
        res.resposta_id === respostaId.toString()
    )
    console.log('Resultado encontrado:', resultado)
    return resultado ? resultado.correta : null
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <img
            src="/assets/img/geoteca.jpg"
            alt="Logo" // alt para acessibilidade
            width="100px"
            className="img-logo rounded"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flex-lg-row-reverse"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Início <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Login">
                Área do Professor
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Jumbotron */}
      <div className="jumbotron jumbotron-fluid text-center bg-light">
        <div className="container">
          <h1 className="display-4">Bem-vindo à Geoteca</h1>
          <p className="lead">
            Após escolher a temática, insira o número da sua turma, o número da
            sua chamada, responda a ficha de estudo e clique no botão "Enviar".
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="container mt-5 bg-secondary text-light rounded-lg p-3 mb-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={handleDisciplinaSubmit}>
              <div className="form-group">
                <label htmlFor="disciplinaInput">Escolha a temática</label>
                <select
                  onChange={handleDisciplinaChange}
                  value={disciplina}
                  className="form-control"
                  id="disciplinaInput"
                  aria-required="true" // Indica que o campo é obrigatório
                  required
                >
                  <option value="">Selecione a temática</option>
                  <option value="todas">Todas</option>
                  <option value="Geografia física">Geografia física</option>
                  <option value="Geografia urbana">Geografia urbana</option>
                  <option value="Cartografia">Cartografia</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Carregar questões'}
              </button>
            </form>

            {questoes.length > 0 && !mostrarResultados && (
              <form onSubmit={handleSubmit} className="mt-5">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="numeroTurmaInput">Número da turma:</label>
                    <input
                      onChange={(e) => setNumeroTurma(e.target.value)}
                      type="text"
                      className="form-control"
                      id="numeroTurmaInput"
                      aria-required="true" // Indica obrigatoriedade para o leitor de tela
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="numeroChamadaInput">
                      Número da chamada:
                    </label>
                    <input
                      onChange={(e) => setNumeroChamada(e.target.value)}
                      type="text"
                      className="form-control"
                      id="numeroChamadaInput"
                      aria-required="true" // Indica obrigatoriedade para o leitor de tela
                      required
                    />
                  </div>
                </div>
                {questoes.map((questao) => (
                  <div key={questao.id} className="form-group">
                    <label htmlFor={`questao${questao.id}`}>
                      {questao.enunciado}
                    </label>
                    {questao.respostas.map((resposta, respostaIndex) => (
                      <div key={resposta.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`questao${questao.id}`} // Assegurando que o nome seja correto
                          id={`questao${questao.id}_resposta${resposta.id}`} // Usando a resposta.ID correta
                          value={resposta.id}
                          required
                          disabled={mostrarResultados}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`questao${questao.id}_resposta${resposta.id}`}
                        >
                          <span className="option-letter">
                            {getOptionLetter(respostaIndex)}
                          </span>{' '}
                          {resposta.texto_resposta}
                          {mostrarResultados &&
                            respostasUsuario[`questao${questao.id}`] ===
                              resposta.id &&
                            (isRespostaCorreta(questao.id, resposta.id)
                              ? ' - Correta'
                              : ' - Incorreta')}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <button type="submit" className="btn btn-success btn-block">
                  Enviar Respostas
                </button>
              </form>
            )}

            {mostrarResultados && (
              <div className="mt-5">
                <h4>
                  Total de acertos: {totalAcertos} de {questoes.length}
                </h4>
                {questoes.map((questao) => (
                  <div key={questao.id} className="questao-resposta">
                    <h5>{questao.enunciado}</h5>
                    {questao.respostas.map((resposta) => (
                      <p key={resposta.id}>
                        <span className="option-letter">
                          {getOptionLetter(questao.respostas.indexOf(resposta))}
                        </span>{' '}
                        {resposta.texto_resposta}
                        {isRespostaCorreta(questao.id, resposta.id) !==
                          null && (
                          <span
                            className={
                              isRespostaCorreta(questao.id, resposta.id)
                                ? 'correta'
                                : 'incorreta'
                            }
                          >
                            {isRespostaCorreta(questao.id, resposta.id)
                              ? ' (Correta)'
                              : ' (Incorreta)'}
                          </span>
                        )}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {mensagemSucesso && (
              <div className="alert alert-success mt-3" role="alert">
                {mensagemSucesso}
              </div>
            )}

            {/* Botão para redirecionar para o início */}
            {mostrarResultados && (
              <div className="d-flex justify-content-center mb-3">
                <a href="/" className="btn btn-primary">
                  Voltar ao início
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Formulario
