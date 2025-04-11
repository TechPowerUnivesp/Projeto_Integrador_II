import path from 'path';
import { Professor, Questao, Resposta } from './models/indexModels.js';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static data that was previously in db.json
const staticData = {
  usuario: {
    username: "professor",
    password: "senha123"
  },
  formulario: [
    {
      "id": "692e",
      "numeroChamada": "12",
      "serieEscola": "9A",
      "1. Qual é o maior país do mundo em área terrestre?": "A. Brasil",
      "2. Qual é o rio mais longo do mundo?": "A. Rio Amazonas",
      "3. Como os povos se orientavam no passado?": "A. Pelos astros",
      "4. O que é a Cartografia?": "A. É a ciência que estuda os planetas.",
      "5. O que foi o Tratado de Tordesilhas?": "A. Foi um acordo entre Portugal e Espanha, celebrado em 1494, que dividiu o novo mundo através de um meridiano a 370 léguas a oeste do Arquipélago de Cabo Verde."
    }
  ]
};

// Additional answers for each question
const questionAnswers = {
  "Qual é o maior país do mundo em área terrestre?": {
    correctAnswer: "Brasil",
    otherAnswers: ["Rússia", "China", "Estados Unidos", "Canadá"]
  },
  "Qual é o rio mais longo do mundo?": {
    correctAnswer: "Rio Amazonas",
    otherAnswers: ["Rio Nilo", "Rio Mississipi", "Rio Yangtzé", "Rio Congo"]
  },
  "Como os povos se orientavam no passado?": {
    correctAnswer: "Pelos astros",
    otherAnswers: ["Por mapas de papel", "Por bússolas primitivas", "Pela direção do vento", "Por marcos naturais"]
  },
  "O que é a Cartografia?": {
    correctAnswer: "É a ciência que estuda os planetas.",
    otherAnswers: [
      "É a ciência que estuda os mapas e como representar a Terra em superfícies planas",
      "É o estudo dos vulcões e terremotos",
      "É o estudo das correntes marítimas",
      "É a ciência que estuda as formações rochosas"
    ]
  },
  "O que foi o Tratado de Tordesilhas?": {
    correctAnswer: "Foi um acordo entre Portugal e Espanha, celebrado em 1494, que dividiu o novo mundo através de um meridiano a 370 léguas a oeste do Arquipélago de Cabo Verde.",
    otherAnswers: [
      "Foi um acordo comercial entre França e Inglaterra",
      "Foi um tratado de paz após a Segunda Guerra Mundial",
      "Foi um pacto de não-agressão entre países europeus",
      "Foi uma aliança militar entre países asiáticos"
    ]
  }
};

export async function seedDatabase() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connection established');

    // Sync models with force: false to preserve existing data
    await sequelize.sync({ force: false });
    console.log('Database synced with force: false');

    // Check if database is already seeded by looking for existing professors
    const professorCount = await Professor.count();
    const questionCount = await Questao.count();
    
    if (professorCount > 0 || questionCount > 0) {
      console.log('Database already contains data, skipping seed process');
      return;
    }
    
    console.log('Database is empty, starting seed process...');

    // Seed Professor
    await Professor.create({
      username: staticData.usuario.username,
      password: staticData.usuario.password
    });
    console.log('Professor created');

    // Seed questions and answers from formulario
    if (staticData.formulario && staticData.formulario.length > 0) {
      for (const form of staticData.formulario) {
        // Extract questions and answers from form
        const questions = Object.entries(form)
          .filter(([key]) => key.match(/^\d+\./)) // Get only numbered questions
          .map(([question, answer]) => ({
            enunciado: question.substring(question.indexOf(' ') + 1), // Remove number prefix
            disciplina: "Geografia",
            resposta_correta: answer.substring(3) // Remove prefix like "A. "
          }));

        // Create questions and multiple answers
        for (const questionData of questions) {
          const question = await Questao.create({
            enunciado: questionData.enunciado,
            disciplina: questionData.disciplina
          });

          // Create the correct answer
          await Resposta.create({
            texto_resposta: questionData.resposta_correta,
            questao_id: question.id,
            correta: true // This is the correct answer
          });

          // Get additional answers for this question
          const answerSet = questionAnswers[questionData.enunciado];
          
          if (answerSet && answerSet.otherAnswers) {
            // Create incorrect answers
            for (const wrongAnswer of answerSet.otherAnswers) {
              await Resposta.create({
                texto_resposta: wrongAnswer,
                questao_id: question.id,
                correta: false
              });
            }
          }
        }
      }
      console.log('Questions and multiple answers created');
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}