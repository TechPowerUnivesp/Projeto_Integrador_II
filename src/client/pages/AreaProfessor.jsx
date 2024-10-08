import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AreaProfessor() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/formulario')
            .then(response => {
                setAlunos(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Função para lidar com a exclusão
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Você tem certeza que deseja excluir?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/formulario/${id}`)
                .then(() => {
                    setAlunos(alunos.filter(aluno => aluno.id !== id));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <>
            {/* <!-- Navbar --> */}
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
                            <a className="nav-link" href="/Gabarito">Gabarito</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <!-- Jumbotron --> */}
            <div className="jumbotron jumbotron-fluid text-center bg-light">
                <div className="container">
                    <h1 className="display-4">Área do Professor</h1>
                    <p className="lead">Aqui você pode verificar as respostas dos alunos.</p>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <ol>
                            {alunos.map(aluno => (
                                <li key={aluno.id}>
                                    <div className="btn btn-primary d-flex justify-content-around align-items-center mb-3">
                                        <span>Número da chamada: {aluno.numeroChamada}</span>
                                        <span>Série: {aluno.serieEscola}</span>
                                        <a href={`/DetalhesAluno/${aluno.id}`} className="btn btn-success ml-3">
                                            <i className="fa fa-file-text-o"></i>
                                        </a>

                                        <button onClick={() => handleDelete(aluno.id)} className="btn btn-danger ml-3">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    )
}

export default AreaProfessor
