import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { createApiUrl } from '../config/api.js'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(
        createApiUrl('professor/login'),
        {
          username,
          password,
        }
      )

      if (response.data.success) {
        // Redireciona para a área do professor
        window.location.href = '/AreaProfessor'
      } else {
        // Exibe um alerta na tela com a mensagem de erro específica
        alert(response.data.message)
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Erro ao fazer login')
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Login Professor</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Usuário</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Digite seu usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block bg-success"
                    >
                      Entrar
                    </button>
                  </div>
                </form>
                <div className="d-flex justify-content-center mb-3">
                  <a href="/" className="btn btn-primary btn-block">
                    Voltar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
