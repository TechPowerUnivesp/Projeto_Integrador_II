import React, { useState } from 'react'
import axios from 'axios'
import './Formulario.css'

function Formulario() {
  const [numeroChamada, setNumeroChamada] = useState('')
  const [numeroTurma, setNumeroTurma] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [questoes, setQuestoes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleDisciplinaChange = (event) => {
    setDisciplina(event.target.value)
  }

  const handleDisciplinaSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    // Adiciona debug para ver qual URL está sendo chamada
    console.log('Disciplina selecionada:', disciplina)

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

    const respostas = {}
    questoes.forEach((questao) => {
      const respostaSelecionada = document.querySelector(
        `input[name="questao${questao.id}"]:checked`
      )
      if (respostaSelecionada) {
        respostas[`questao${questao.id}`] = respostaSelecionada.value
      }
    })

    const payload = {
      numeroChamada,
      numeroTurma,
      respostas,
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/respostas',
        payload
      )
      console.log('Respostas enviadas com sucesso:', response.data)
    } catch (error) {
      console.error('Erro ao enviar respostas:', error)
    }
  }

  const getOptionLetter = (index) => {
    return String.fromCharCode(97 + index) // 97 é o código ASCII para 'a'
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          <img
            src="/assets/img/geoteca.jpg"
            alt="Logo"
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
            sua chamada, responda a ficha de estudo e clique no botão ‘Enviar’.
          </p>
        </div>
      </div>
      {/* Formulario */}
      <div className="container mt-5 bg-secondary text-light rounded-lg p-3 mb-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Seleção da disciplina e carregar as questões */}
            <form
              onSubmit={handleDisciplinaSubmit}
              method="post"
              className="needs-validation"
            >
              <div className="form-group">
                <label htmlFor="disciplinaInput">Escolha a temática</label>
                <select
                  onChange={handleDisciplinaChange}
                  value={disciplina}
                  className="form-control"
                  id="disciplinaInput"
                  name="disciplina"
                  required
                >
                  <option value="">Selecione a temática</option>
                  <option value="todas">Todas</option>
                  <option value="Geografia fisica">Geografia física</option>
                  <option value="Geografia urbana">Geografia urbana</option>
                  <option value="Cartografia">Cartografia</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Carregar Questões'}
              </button>
            </form>
            {/* Formulário para responder as questões e enviar */}
            {Array.isArray(questoes) && questoes.length > 0 && (
              <form
                onSubmit={handleSubmit}
                method="post"
                className="needs-validation mt-5"
              >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="numeroTurmaInput">Número da turma:</label>
                    <input
                      onChange={(e) => setNumeroTurma(e.target.value)}
                      type="text"
                      className="form-control"
                      id="numeroTurmaInput"
                      name="numeroTurma"
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
                      name="numeroChamada"
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
                      <div key={resposta.ID} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`questao${questao.id}`}
                          id={`questao${questao.id}_resposta${resposta.ID}`}
                          value={resposta.ID}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`questao${questao.id}_resposta${resposta.ID}`}
                        >
                          <span className="option-letter">
                            {getOptionLetter(respostaIndex)}
                          </span>
                          {resposta.texto_resposta}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
                <button type="submit" className="btn btn-primary btn-block">
                  Enviar Respostas
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Formulario
