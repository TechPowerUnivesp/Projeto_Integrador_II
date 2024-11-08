import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function DetalhesAluno() {
  console.log('Componente DetalhesAluno renderizado')
  const query = useQuery()
  const numero_turma = query.get('numero_turma')
  const numero_chamada = query.get('numero_chamada')
  const [respostas, setRespostas] = useState([])

  useEffect(() => {
    const fetchRespostasAluno = async () => {
      try {
        console.log('Buscando respostas do aluno...')
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
      {/* Jumbotron */}
      <div className="jumbotron jumbotron-fluid text-center p-3 mb-2 bg-primary text-white">
        <div className="container">
          <h1 className="display-4">Respostas do Aluno</h1>
          <p className="lead">
            Confira aqui as respostas das questões do formulário.
          </p>
        </div>
      </div>
      {/* Detalhes do Aluno */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="display-5">Detalhes do Aluno</h3>
            <p className="lead">
              Turma: <strong>{numero_turma}</strong>
            </p>
            <p className="lead">
              Número da chamada: <strong>{numero_chamada}</strong>
            </p>
          </div>
        </div>
        {/* Respostas do Formulário */}
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h4>Respostas do Formulário</h4>
            {respostas.length > 0 ? (
              respostas.map((respostaAluno) => {
                const { id, questao, resposta_id } = respostaAluno
                // Encontra a resposta selecionada pelo aluno
                const respostaSelecionada = questao.respostas.find(
                  (resp) => resp.id === resposta_id
                )
                // Encontra a resposta correta
                const respostaCorreta = questao.respostas.find(
                  (resp) => resp.correta == 1 // Usando == para coerção de tipos
                )

                // Verifica se a resposta do aluno está correta
                const isCorrect =
                  respostaSelecionada && respostaCorreta
                    ? respostaSelecionada.id === respostaCorreta.id
                    : false

                return (
                  <div key={id} className="card mb-4">
                    <div className="card-body">
                      {/* Enunciado da Questão */}
                      <h5 className="card-title">{questao.enunciado}</h5>
                      {/* Resposta do Aluno */}
                      <p
                        className={`card-text ${
                          isCorrect
                            ? 'text-success'
                            : respostaSelecionada
                            ? 'text-danger'
                            : ''
                        }`}
                      >
                        <strong>Resposta do Aluno:</strong>{' '}
                        {respostaSelecionada
                          ? respostaSelecionada.texto_resposta
                          : 'Não respondida'}
                      </p>
                      {/* Resposta Correta */}
                      <p className="card-text text-success">
                        <strong>Resposta Correta:</strong>{' '}
                        {respostaCorreta
                          ? respostaCorreta.texto_resposta
                          : 'Não disponível'}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <p>Não há respostas para este aluno.</p>
            )}
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-center mb-3">
          <a href="/AreaProfessor" className="btn btn-primary">
            Voltar
          </a>
        </div>
      </div>
    </>
  )
}

export default DetalhesAluno
