import fs from 'fs';
import path from 'path';
import { Professor, Questao, Resposta } from './models/indexModels.js';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

        // Read data from db.json
        const dbData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
        );

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
            for (const form of dbData.formulario) {
                // Extract questions and answers from form
                const questions = Object.entries(form)
                    .filter(([key]) => key.match(/^\d+\./)) // Get only numbered questions
                    .map(([question, answer]) => ({
                        enunciado: question.substring(question.indexOf(' ') + 1), // Remove number prefix
                        disciplina: "Geografia",
                        resposta: answer.substring(3) // Remove prefix like "A. "
                    }));

                // Create questions and answers
                for (const questionData of questions) {
                    const question = await Questao.create({
                        enunciado: questionData.enunciado,
                        disciplina: questionData.disciplina
                    });

                    // Create the answer
                    await Resposta.create({
                        texto_resposta: questionData.resposta,
                        questao_id: question.id,
                        correta: true // Assuming the answer in the JSON is the correct one
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