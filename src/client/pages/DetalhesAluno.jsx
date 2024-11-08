import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function DetalhesAluno() {
  console.log('Componente DetalhesAluno renderizado')
  console.log('Buscando respostas do aluno...')
  const query = useQuery()
  const numero_turma = query.get('numero_turma')
  const numero_chamada = query.get('numero_chamada')
  const [respostas, setRespostas] = useState([])

  useEffect(() => {
    const fetchRespostasAluno = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/alunos/respostas?numero_turma=${numero_turma}&numero_chamada=${numero_chamada}`
        )
        setRespostas(response.data)
        console.log('Respostas recebidas:', response.data)
      } catch (error) {
        console.error('Erro ao buscar respostas do aluno:', error)
      }
    }

    if (numero_turma && numero_chamada) {
      fetchRespostasAluno()
    }
  }, [numero_turma, numero_chamada])

  console.log('ALUNO', respostas)

  return (
    <>
      {/* <!-- Jumbotron --> */}
      <div className="jumbotron jumbotron-fluid text-center p-3 mb-2 bg-primary text-white">
        <div className="container">
          <h1 className="display-4">Respostas do aluno</h1>
          <p className="lead">
            Confira aqui as respostas das questões do formulário.
          </p>
        </div>
      </div>

      {/* <!-- Detalhes do aluno --> */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="display-5">Detalhes do aluno</h3>
            <p className="lead">
              Turma: <strong>{numero_turma}</strong>
            </p>
            <p className="lead">
              Número da chamada: <strong>{numero_chamada}</strong>
            </p>
            <br />

            <h3 className="display-5">Respostas do formulário</h3>
            <div className="form-group">
              <fieldset>
                {/* Mapear perguntas e respostas */}
                {respostas.map((resposta) => (
                  <li key={resposta.id}>
                    <p>{resposta.questao.enunciado}</p>
                    <ul>
                      {resposta.questao.respostas.map((resp) => (
                        <li key={resp.id}>{resp.texto_resposta}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </fieldset>
            </div>

            <br />
            <div className="d-flex justify-content-center mb-3">
              <a href="/AreaProfessor" className="btn btn-primary">
                Voltar
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetalhesAluno
