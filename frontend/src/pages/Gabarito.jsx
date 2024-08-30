function Gabarito() {
    return (
      <>
        {/* <!-- Jumbotron --> */}
    <div className="jumbotron jumbotron-fluid text-center p-3 mb-2 bg-primary text-white">
        <div className="container">
            <h1 className="display-4">Gabarito</h1>
            <p className="lead">Aqui estão as respostas corretas para o questionário.</p>
        </div>
    </div>
    {/* <!-- Gabarito --> */}
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <form method="post" className="needs-validation" novalidate>
                    {/* <!-- Questionário --> */}
                    <div className="form-group">
                        <fieldset>
                            {/* <!-- Pergunta 1 --> */}
                            <div className="form-group">
                                <label for="input_1">1. Qual é o maior país do mundo em área terrestre?</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="alternativaP1" id="input_1D" checked></input>
                                    <label className="form-check-label text-success" for="input_1D">D. Rússia</label>
                                </div>
                            </div>
                            <br/>
                            {/* <!-- Pergunta 2 --> */}
                            <div className="form-group">
                                <label for="input_2">2. Qual é o rio mais longo do mundo?</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="alternativaP2" id="input_2B" checked></input>
                                    <label className="form-check-label text-success" for="input_2B">B. Rio Nilo</label>
                                </div>
                            </div>
                            <br/>
                            {/* <!-- Pergunta 3 --> */}
                            <div className="form-group">
                                <label for="input_3">3. Como os povos se orientavam no passado?</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="alternativaP3" id="input_3A" checked></input>
                                    <label className="form-check-label text-success" for="input_3A">A. Pelos astros</label>
                                </div>
                            </div>
                            <br/>
                            {/* <!-- Pergunta 4 --> */}
                            <div className="form-group">
                                <label for="input_4">4. O que é a Cartografia?</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="alternativaP4" id="input_4B" checked></input>
                                    <label className="form-check-label text-success" for="input_4B">B. É a ciência que representa
                                        graficamente uma área geográfica ou uma superfície plana.</label>
                                </div>
                            </div>
                            <br/>
                            {/* <!-- Pergunta 5 --> */}
                            <div className="form-group">
                                <label for="input_5">5. O que foi o Tratado de Tordesilhas?</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="alternativaP5" id="input_5A" checked></input>
                                    <label className="form-check-label text-success" for="input_5A">A. Foi um acordo entre Portugal e
                                        Espanha, celebrado em 1494, que dividiu o novo mundo através de um meridiano a
                                        370 léguas a oeste do Arquipélago de Cabo Verde.</label>
                                </div>
                            </div>
                            <br/>
                        </fieldset>
                    </div>
                </form>
                {/* <!-- Botão Voltar --> */}
                <div className="d-flex justify-content-center mb-3">
                    <a href="/" className="btn btn-primary">Voltar</a>
                </div>
            </div>
        </div>
        </div>
      </>
    )
}
  
export default Gabarito
