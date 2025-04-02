import fs from 'fs';
import path from 'path';
import { Professor, Questao, Resposta } from './models/indexModels.js';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function seedDatabase() {
    try {
      const dbData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
      );
  
      // Connect to database
      await sequelize.authenticate();
      console.log('Database connection established');
  
      // Sync models
      await sequelize.sync({ force: true });
      console.log('Database synced');
  
      // Seed Professor
      if (dbData.usuario) {
        await Professor.create({
          username: dbData.usuario.username,
          password: dbData.usuario.password
        });
        console.log('Professor created');
      }
  
      // Seed questions and answers from formulario
      if (dbData.formulario && dbData.formulario.length > 0) {
        const form = dbData.formulario[0];
        
        // Create Geography questions based on form content
        const questions = [
          {
            enunciado: "Qual é o maior país do mundo em área terrestre?",
            disciplina: "Geografia física",
            respostas: [
              { texto_resposta: "Brasil", correta: 0 },
              { texto_resposta: "Rússia", correta: 1 },
              { texto_resposta: "China", correta: 0 },
              { texto_resposta: "Estados Unidos", correta: 0 }
            ]
          },
          {
            enunciado: "Qual é o rio mais longo do mundo?",
            disciplina: "Geografia física",
            respostas: [
              { texto_resposta: "Rio Amazonas", correta: 0 },
              { texto_resposta: "Rio Nilo", correta: 1 },
              { texto_resposta: "Rio Mississipi", correta: 0 },
              { texto_resposta: "Rio Yangtzé", correta: 0 }
            ]
          },
        ];
        
        // Create questions and answers
        for (const questionData of questions) {
          const question = await Questao.create({
            enunciado: questionData.enunciado,
            disciplina: questionData.disciplina
          });
          
          // Create answers for this question
          for (const answerData of questionData.respostas) {
            await Resposta.create({
              texto_resposta: answerData.texto_resposta,
              questao_id: question.id,
              correta: answerData.correta
            });
          }
        }
        
        console.log('Questions and answers created');
      }
  
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }