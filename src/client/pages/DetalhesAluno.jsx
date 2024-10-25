import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalhesAluno() {
    const { id } = useParams();
    const [aluno, setAluno] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/respostasAluno/${id}`)
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
            
            {/* <!-- Detalhes do aluno --> */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h3 className="display-5">Detalhes do Aluno</h3>
                        <p className="lead">Número da chamada: <strong>{aluno.numeroChamada}</strong></p>
                        <p className="lead">Série: <strong>{aluno.serieEscola}</strong></p>
                        <br />
    
                        <h3 className="display-5">Respostas do Formulário</h3>
                        <div className="form-group">
                            <fieldset>
                                {/* Mapear perguntas e respostas */}
                                {aluno.questoes.map((questao, index) => (
                                    <div className="form-group" key={index}>
                                        <label htmlFor={`input_${index}`}>
                                            {`Questão ${index + 1}: ${questao.pergunta}`}
                                            <br />
                                            Resposta: <strong>{questao.resposta}</strong>
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>
    
                        <br />
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
