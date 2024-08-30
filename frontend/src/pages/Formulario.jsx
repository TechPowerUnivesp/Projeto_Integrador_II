import React, { useState } from 'react';
import axios from 'axios';

function Formulario() {

  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
    axios.post('http://localhost:3000/formulario', form)
    .then(response => {
        console.log('Success:', response.data);
        setSubmitted(true);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
  // Se o formulário foi enviado, renderiza a tela de sucesso
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
    )
    // Json-server
    function handleSubmit(event) {
      event.preventDefault();
      axios.post('http://localhost:3000/respostas', form)
      .then(response => {
          console.log('Success:', response.data);
          setSubmitted(true);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }
  }
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/"> <img src="\src\assets\img\geoteca.jpg" alt="Logo" width="100px" className="img-logo rounded" /></a>
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
          <p className="lead">Insira seu número de chamada e sua série. Após responder a ficha de estudo, clique no botão
            ‘Enviar’.</p>
        </div>
      </div>
      {/* <!-- Formulário --> */}
      <div className="container mt-5 bg-secondary text-light rounded-lg p-3 mb-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={handleSubmit} method="post" className="needs-validation">
              <div className="form-group">
                <label htmlFor="numeroInput">Número da chamada:</label>
                <input onChange={handleChange} type="text" className="form-control" id="numeroInput" name="numeroChamada" required
                  pattern="^\d{1,3}$"></input>
              </div>
              <div className="form-group">
                <label htmlFor="serieInput">Série:</label>
                <input onChange={handleChange} type="text" className="form-control" id="serieInput" name="serieEscola" placeholder="ex: 7A"
                  required pattern="^\d{1,2}[A-Z]$"></input>
              </div>
              {/* <!-- Questionário --> */}
              <div className="form-group">
                <fieldset>
                  <legend>Questionário</legend>
                  {/* <!-- Pergunta 1 --> */}
                  <div className="form-group">
                    <label htmlFor="input_1">1. Qual é o maior país do mundo em área terrestre?</label>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="1. Qual é o maior país do mundo em área terrestre?" id="input_1A"
                        value="A. Brasil" required></input>
                      <label className="form-check-label" htmlFor="input_1A">A. Brasil</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="1. Qual é o maior país do mundo em área terrestre?" id="input_1B"
                        value="B. Estados Unidos"></input>
                      <label className="form-check-label" htmlFor="input_1B">B. Estados Unidos</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="1. Qual é o maior país do mundo em área terrestre?" id="input_1C"
                        value="C. China"></input>
                      <label className="form-check-label" htmlFor="input_1C">C. China</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="1. Qual é o maior país do mundo em área terrestre?" id="input_1D"
                        value="D. Rússia"></input>
                      <label className="form-check-label" htmlFor="input_1D">D. Rússia</label>
                    </div>
                  </div>
                  {/* <!-- Pergunta 2 --> */}
                  <div className="form-group">
                    <label htmlFor="input_2">2. Qual é o rio mais longo do mundo?</label>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="2. Qual é o rio mais longo do mundo?" id="input_2A"
                        value="A. Rio Amazonas" required></input>
                      <label className="form-check-label" htmlFor="input_2A">A. Rio Amazonas</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="2. Qual é o rio mais longo do mundo?" id="input_2B"
                        value="B. Rio Nilo"></input>
                      <label className="form-check-label" htmlFor="input_2B">B. Rio Nilo</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="2. Qual é o rio mais longo do mundo?" id="input_2C"
                        value="C. Rio Yangtzé"></input>
                      <label className="form-check-label" htmlFor="input_2C">C. Rio Yangtzé</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="2. Qual é o rio mais longo do mundo?" id="input_2D"
                        value="D. Rio Mississippi"></input>
                      <label className="form-check-label" htmlFor="input_2D">D. Rio Mississippi</label>
                    </div>
                  </div>
                  {/* <!-- Pergunta 3 --> */}
                  <div className="form-group">
                    <label htmlFor="input_3">3. Como os povos se orientavam no passado?</label>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="3. Como os povos se orientavam no passado?" id="input_3A"
                        value="A. Pelos astros" required></input>
                      <label className="form-check-label" htmlFor="input_3A">A. Pelos astros</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="3. Como os povos se orientavam no passado?" id="input_3B"
                        value="B. Pelo clima"></input>
                      <label className="form-check-label" htmlFor="input_3B">B. Pelo clima</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="3. Como os povos se orientavam no passado?" id="input_3C"
                        value="C. Pelas placas tectônicas"></input>
                      <label className="form-check-label" htmlFor="input_3C">C. Pelas placas tectônicas</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="3. Como os povos se orientavam no passado?" id="input_3D"
                        value="D. Por GPS"></input>
                      <label className="form-check-label" htmlFor="input_3D">D. Por GPS</label>
                    </div>
                  </div>
                  {/* <!-- Pergunta 4 --> */}
                  <div className="form-group">
                    <label htmlFor="input_4">4. O que é a Cartografia?</label>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="4. O que é a Cartografia?" id="input_4A"
                        value="A. É a ciência que estuda os planetas." required></input>
                      <label className="form-check-label" htmlFor="input_4A">A. É a ciência que estuda os planetas.</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="4. O que é a Cartografia?" id="input_4B"
                        value="B. É a ciência que representa graficamente uma área geográfica ou uma superfície plana."></input>
                      <label className="form-check-label" htmlFor="input_4B">B. É a ciência que representa graficamente uma área geográfica ou uma superfície plana.</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="4. O que é a Cartografia?" id="input_4C"
                        value="C. É a ciência que estuda os animais."></input>
                      <label className="form-check-label" htmlFor="input_4C">C. É a ciência que estuda os animais.</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="4. O que é a Cartografia?" id="input_4D"
                        value="D. É a ciência que estuda as plantas."></input>
                      <label className="form-check-label" htmlFor="input_4D">D. É a ciência que estuda as plantas.</label>
                    </div>
                  </div>
                  {/* <!-- Pergunta 5 --> */}
                  <div className="form-group">
                    <label htmlFor="input_5">5. O que foi o Tratado de Tordesilhas?</label>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="5. O que foi o Tratado de Tordesilhas?" id="input_5A"
                        value="A. Foi um acordo entre Portugal e Espanha, celebrado em 1494, que dividiu o novo mundo através de um meridiano a 370 léguas a oeste do Arquipélago de Cabo Verde." required></input>
                      <label className="form-check-label" htmlFor="input_5A">A. Foi um acordo entre Portugal e Espanha, celebrado em 1494, que dividiu o novo mundo através de um meridiano a 370 léguas a oeste do Arquipélago de Cabo Verde.</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="5. O que foi o Tratado de Tordesilhas?" id="input_5B"
                        value="B. Foi um acordo entre França e Inglaterra para dividir a África."></input>
                      <label className="form-check-label" htmlFor="input_5B">B. Foi um acordo entre França e Inglaterra para dividir a África.</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="5. O que foi o Tratado de Tordesilhas?" id="input_5C"
                        value="C. Foi um acordo entre Estados Unidos e Rússia para dividir a Antártica."></input>
                      <label className="form-check-label" htmlFor="input_5C">C. Foi um acordo entre Estados Unidos e Rússia para dividir a Antártica.</label>
                    </div>
                    <div className="form-check">
                      <input onChange={handleChange} className="form-check-input" type="radio" name="5. O que foi o Tratado de Tordesilhas?" id="input_5D"
                        value="D. Foi um acordo entre China e Índia para dividir a Austrália."></input>
                      <label className="form-check-label" htmlFor="input_5D">D. Foi um acordo entre China e Índia para dividir a Austrália.</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button type="submit" className="btn btn-success btn-block">Enviar Respostas <i className="fas fa-paper-plane"></i></button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Formulario
