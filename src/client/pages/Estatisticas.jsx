import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

function Estatisticas() {
  const [dadosPorTematica, setDadosPorTematica] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/estatisticas")
      .then(response => {
        const tematicas = response.data.ConsultaGeral || [];
        setDadosPorTematica(tematicas);

        // Captura turmas únicas
        const turmasUnicas = [...new Set(tematicas.map(dado => dado.numero_turma))];
        setTurmas(turmasUnicas);

        // Define a turma padrão como a primeira da lista
        if (turmasUnicas.length > 0) setTurmaSelecionada(turmasUnicas[0]);
      })
      .catch(error => {
        console.error("Erro ao buscar estatísticas:", error);
      });
  }, []);

  const tematicasPadrao = [
    { tematica: "Geografia física", acertos: 0, erros: 0 },
    { tematica: "Geografia urbana", acertos: 0, erros: 0 },
    { tematica: "Cartografia", acertos: 0, erros: 0 }
  ];

  const dadosFiltrados = dadosPorTematica.filter(dado => dado.numero_turma === turmaSelecionada);
  const dadosCompletos = tematicasPadrao.map(tematicaPadrao => {
    const tematicaReal = dadosFiltrados.find(d => d.tematica === tematicaPadrao.tematica);
    return tematicaReal || tematicaPadrao;
  });

  const cores = ["#0088FE", "#FF0000", "#C0C0C0"];

  return (


    <div>
      {/* Jumbotron */}
      <div className="jumbotron jumbotron-fluid text-center p-3 mb-2 bg-primary text-white">
        <div className="container">
          <h1 className="display-4">📊 Estatísticas por Temática</h1>
        </div>
      </div>
      <div className="container mt-5">
      {/* Seletor de turma */}
      <div className="text-center mb-4">
        <label htmlFor="turma" className="form-label">Escolha uma turma:   </label>
        <select
          id="turma"
          className="form-select d-inline-block w-auto"
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
        >
          {turmas.map(turma => (
            <option key={turma} value={turma}>
              Turma {turma}
            </option>
          ))}
        </select>
      </div>

      {/* Gráficos lado a lado */}
      <div className="row text-center">
        {dadosCompletos.map((tematica, index) => (
          <div key={index} className="col-md-4 mb-3">
            <h4>{tematica.tematica}</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Acertos", value: parseInt(tematica.acertos) || 1 },
                    { name: "Erros", value: parseInt(tematica.erros) || 1 }
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={(entry) => entry.name}
                >
                  {[
                    { name: "Acertos", value: parseInt(tematica.acertos) || 1 },
                    { name: "Erros", value: parseInt(tematica.erros) || 1 }
                  ].map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.value === 1 && !tematica.acertos && !tematica.erros ? "#C0C0C0" : cores[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Botão para voltar à Área do Professor */}
      <div className="text-center mt-4">
        <a
          href="http://localhost:5173/AreaProfessor"
          className="btn btn-primary"
        >
          Voltar para Área do Professor
        </a>
      </div>
    </div>
    </div>
  );
}

export default Estatisticas;
