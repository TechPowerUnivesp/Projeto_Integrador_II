import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalhesAluno() {
    const { id } = useParams();
    const [aluno, setAluno] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/formulario/${id}`)
            .then(response => {
                setAluno(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    if (!aluno) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <!-- Jumbotron --> */}
            <div className="jumbotron jumbotron-fluid text-center p-3 mb-2 bg-primary text-white">
                <div className="container">
                    <h1 className="display-4">Respostas do aluno</h1>
                    <p className="lead">Confira aqui as respostas das questões do formulário.</p>
                </div>
            </div>
            {/* <!-- Respostas do aluno --> */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="display-5">Detalhes do Aluno</h3>
                        <p className="lead">Número da chamada: <strong>{aluno.numeroChamada}</strong> 
                        </p>
                        <p className="lead">Série: <strong>{aluno.serieEscola}</strong> 
                        </p>
                        <br></br>
                        <h3 className="display-5" >Respostas do Formulário</h3>
                        <div className="form-group">
                            <fieldset>
                                <div className="form-group">
                                    <label htmlFor="input_1">Questão 1: Qual é o maior país do mundo em área terrestre?
                                        <br></br>
                                        Resposta: <strong>{aluno["1. Qual é o maior país do mundo em área terrestre?"]}</strong> 
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input_2">Questão 2: Qual é o rio mais longo do mundo?
                                        <br></br>
                                        Resposta: <strong>{aluno["2. Qual é o rio mais longo do mundo?"]}</strong> 
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input_3">Questão 3: Como os povos se orientavam no passado?
                                        <br></br>
                                        Resposta: <strong>{aluno["3. Como os povos se orientavam no passado?"]}</strong> 
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input_4">Questão 4: O que é a Cartografia?
                                        <br></br>
                                        Resposta: <strong>{aluno["4. O que é a Cartografia?"]}</strong> 
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="input_5">Questão 5: O que foi o Tratado de Tordesilhas?
                                        <br></br>
                                        Resposta: <strong>{aluno["5. O que foi o Tratado de Tordesilhas?"]}</strong> 
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        <br></br>
                        <div className="d-flex justify-content-center mb-3">
                            <a href="/AreaProfessor" className="btn btn-primary">Voltar</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default DetalhesAluno;
