import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {
  // Estados para armazenar os dados do formulário, nível, perguntas, status de envio e erros
  const [form, setForm] = useState({}); // Armazena as respostas do formulário
  const [nivel, setNivel] = useState(''); // Armazena o nível de dificuldade selecionado
  const [perguntas, setPerguntas] = useState([]); // Armazena as perguntas recebidas do backend
  const [submitted, setSubmitted] = useState(false); // Indica se o formulário foi submetido com sucesso
  const [loading, setLoading] = useState(false); // Indica se as perguntas estão sendo carregadas
  const [errors, setErrors] = useState({}); // Armazena os erros de validação

  // Função para lidar com mudanças nos campos do formulário
  function handleChange(event) {
    const { name, value, type } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  // Função para lidar com a mudança no nível selecionado
  function handleNivelChange(event) {
    setNivel(event.target.value);
  }

  // Função para buscar as perguntas no backend com base no nível selecionado
  function handleNivelSubmit(event) {
    event.preventDefault();
    setLoading(true); // Ativa o estado de carregamento
    axios.post('http://localhost:3001/getPerguntas', { nivel })
      .then(response => {
        console.log('Perguntas recebidas:', response.data); // Exibe as perguntas recebidas no console
        if (Array.isArray(response.data)) {
          setPerguntas(response.data); // Atualiza a variavel com as perguntas recebidas
        } else {
          console.error('A resposta do servidor não é um array:', response.data);
          setPerguntas([]);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar perguntas:', error);
        setPerguntas([]);
      })
      .finally(() => {
        setLoading(false); // Desativa o estado de carregamento
      });
  }

  // Função para validar o formulário antes do envio
  function validateForm() {
    const newErrors = {};
    // Valida os campos de número da chamada e série
    if (!form.numeroChamada) newErrors.numeroChamada = 'Número da chamada é obrigatório';
    if (!form.serieEscola) newErrors.serieEscola = 'Série é obrigatória';

    // Valida se todas as perguntas foram respondidas
    perguntas.forEach(pergunta => {
      if (!form[pergunta.enunciado]) {
        newErrors[pergunta.enunciado] = `A pergunta "${pergunta.enunciado}" deve ser respondida.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Função para lidar com o envio do formulário
  function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) { // Se o formulário for válido, prossegue com o envio
      // Organizar as respostas para enviar ao backend
      const respostas = perguntas.map(pergunta => ({
        id: pergunta.id, // ID da questão
        resposta: form[pergunta.enunciado] || '' // A resposta dada pelo aluno para essa pergunta
      }));

      // Para verificar no console se os dados estão sendo enviados
      console.log('Dados enviados:', {
        numeroChamada: form.numeroChamada,
        serieEscola: form.serieEscola,
        nivel,
        perguntas: respostas
      });

      // Enviar o formulário com nível, número da chamada, série, perguntas e respostas para o backend
      axios.post('http://localhost:3001/formulario', {
        numeroChamada: form.numeroChamada,
        serieEscola: form.serieEscola,
        nivel,
        perguntas: respostas // Enviando o array de respostas
      })
        .then(response => {
          console.log('Sucesso:', response.data);
          setSubmitted(true);
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    }
  }

  // Renderiza uma mensagem de sucesso após o envio do formulário
  if (submitted) {
    return (
      <div style={{
        width: "300px",
        height: "200px",
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: "-100px",
        marginLeft: "-150px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "20px",
        boxShadow: "0px 0px 150px 3px rgba(0, 0, 0, 0.75)",
        textAlign: "center"
      }}>
        <strong>Formulário enviado com sucesso!</strong>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px 20px",
            marginTop: "50px"
          }}
          onClick={() => window.location.href = '/Gabarito'}
        >
          Gabarito
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/"> <img src="/assets/img/geoteca.jpg" alt="Logo" width="100px" className="img-logo rounded" /></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-lg-row-reverse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Início <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Login">Área do Professor</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Jumbotron */}
      <div className="jumbotron jumbotron-fluid text-center bg-light">
        <div className="container">
          <h1 className="display-4">Bem-vindo à Geoteca</h1>
          <p className="lead">Após escolher o nível insira seu número de chamada, sua série, responda a ficha de estudo e clique no botão ‘Enviar’.</p>
        </div>
      </div>
      {/* Formulario */}
      <div className="container mt-5 bg-secondary text-light rounded-lg p-3 mb-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Seleção do nível e carregar as perguntas */}
            <form onSubmit={handleNivelSubmit} method="post" className="needs-validation">
              <div className="form-group">
                <label htmlFor="nivelInput">Escolha o Nível:</label>
                <select onChange={handleNivelChange} value={nivel} className="form-control" id="nivelInput" name="nivel" required>
                  <option value="">Selecione o Nível</option>
                  <option value="fundamental">Fundamental</option>
                  <option value="basico">Básico</option>
                  <option value="medio">Médio</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Carregando...' : 'Carregar Perguntas'}
              </button>
            </form>
            {/* Formulário para responder as perguntas e enviar */}
            {Array.isArray(perguntas) && perguntas.length > 0 && (
              <form onSubmit={handleSubmit} method="post" className="needs-validation mt-5">
                <div className="form-group">
                  <label htmlFor="numeroInput">Número da chamada:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="numeroInput"
                    name="numeroChamada"
                    required
                    pattern="^\d{1,3}$"
                  />
                  {errors.numeroChamada && <div className="text-danger">{errors.numeroChamada}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="serieInput">Série:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="serieInput"
                    name="serieEscola"
                    placeholder="ex: 7A"
                    required
                    pattern="^\d{1,2}[A-Z]$"
                  />
                  {errors.serieEscola && <div className="text-danger">{errors.serieEscola}</div>}
                </div>
                {/* Renderiza as perguntas e opções de resposta */}
                {perguntas.map((pergunta, index) => (
                  <div key={index} className="form-group">
                    <label>{pergunta.enunciado}</label>
                    {['alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d'].map((alternativa, idx) => (
                      <div className="form-check" key={idx}>
                        <input
                          onChange={handleChange}
                          className="form-check-input"
                          type="radio"
                          name={pergunta.enunciado}
                          value={pergunta[alternativa]}
                          required // Torna a resposta obrigatória
                        />
                        <label className="form-check-label">{pergunta[alternativa]}</label>
                      </div>
                    ))}
                    {/* Exibe uma mensagem de erro caso a pergunta não seja respondida */}
                    {errors[pergunta.enunciado] && <div className="text-danger">{errors[pergunta.enunciado]}</div>}
                  </div>
                ))}
                <button type="submit" className="btn btn-success btn-block">
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Formulario;
