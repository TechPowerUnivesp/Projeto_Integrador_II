import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

function Estatisticas() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/estatisticas");
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchEstatisticas();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">📊 Estatísticas da Turma</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <XAxis dataKey="aluno" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acertos" fill="#4caf50" name="Acertos" />
          <Bar dataKey="erros" fill="#f44336" name="Erros" />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <a href="/AreaProfessor" className="btn btn-primary">
          ⬅ Voltar para Área do Professor
        </a>
      </div>
    </div>
  );
}

export default Estatisticas;
