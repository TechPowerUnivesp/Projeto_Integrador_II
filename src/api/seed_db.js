import path from 'path';
import fs from 'fs';
import { Professor, Questao, Resposta } from './models/indexModels.js';
import { fileURLToPath } from 'url';
import sequelize from './config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Parses the data.txt file containing questions and answers
 * @returns {Array} Array of parsed question objects with their answers and metadata
 */
async function parseDataFile() {
  const dataFilePath = path.join(__dirname, 'data.txt');
  const data = fs.readFileSync(dataFilePath, 'utf8');
  
  const lines = data.split('\n');
  const questions = [];
  
  let currentDisciplina = '';
  let currentQuestion = null;
  let alternatives = [];
  let correctAnswer = '';
  let parsingQuestion = false;
  let parsingAlternatives = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines, but if we were parsing a question, add it to the questions array
    if (!line) {
      if (currentQuestion && alternatives.length > 0 && correctAnswer) {
        // Find the text of the correct alternative
        const correctLetter = correctAnswer.charAt(0).toLowerCase();
        const correctIndex = correctLetter.charCodeAt(0) - 'a'.charCodeAt(0);
        const correctText = (correctIndex >= 0 && correctIndex < alternatives.length) 
          ? alternatives[correctIndex] 
          : '';
        
        questions.push({
          enunciado: currentQuestion,
          disciplina: currentDisciplina,
          answers: alternatives,
          correctAnswer: correctText
        });
        
        // Reset for next question
        currentQuestion = null;
        alternatives = [];
        correctAnswer = '';
        parsingQuestion = false;
        parsingAlternatives = false;
      }
      continue;
    }
    
    // Check for discipline line
    if (line.startsWith('Disciplina:')) {
      currentDisciplina = line.substring('Disciplina:'.length).trim();
      parsingQuestion = false;
      parsingAlternatives = false;
      continue;
    }
    
    // Check for alternatives
    if (line.match(/^[a-d]\)/)) {
      parsingQuestion = false;
      parsingAlternatives = true;
      
      // Extract answer text, removing the prefix
      const answerText = line.substring(line.indexOf(')') + 1).trim();
      alternatives.push(answerText);
      continue;
    }
    
    // Check for correct answer
    if (line.startsWith('Gabarito:')) {
      parsingAlternatives = false;
      correctAnswer = line.substring('Gabarito:'.length).trim();
      continue;
    }
    
    // If we're not parsing alternatives or found a gabarito, and we don't have a current question, 
    // this must be the start of a new question
    if (!parsingAlternatives && !line.startsWith('Gabarito:')) {
      if (!currentQuestion) {
        currentQuestion = line;
        parsingQuestion = true;
      } else if (parsingQuestion) {
        // If we're continuing a multi-line question
        currentQuestion += ' ' + line;
      }
    }
  }
  
  // Add the last question if it exists
  if (currentQuestion && alternatives.length > 0 && correctAnswer) {
    // Find the text of the correct alternative
    const correctLetter = correctAnswer.charAt(0).toLowerCase();
    const correctIndex = correctLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    const correctText = (correctIndex >= 0 && correctIndex < alternatives.length) 
      ? alternatives[correctIndex] 
      : '';
    
    questions.push({
      enunciado: currentQuestion,
      disciplina: currentDisciplina,
      answers: alternatives,
      correctAnswer: correctText
    });
  }
  
  return questions;
}

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
    
    if (professorCount > 0 && questionCount > 0) {
      console.log('Database already contains data, skipping seed process');
      return;
    }
    
    console.log('Database is empty, starting seed process...');

    // Seed Professor if needed
    if (professorCount === 0) {
      await Professor.create({
        username: "professor",
        password: "senha123"
      });
      console.log('Professor created');
    }

    // Only seed questions if needed
    if (questionCount === 0) {
      // Parse data from the file
      const questions = await parseDataFile();
      console.log(`Parsed ${questions.length} questions from data.txt`);

      // Create questions and answers
      for (const questionData of questions) {
        // Create the question
        const question = await Questao.create({
          enunciado: questionData.enunciado,
          disciplina: questionData.disciplina
        });

        // Create answers for this question
        for (let i = 0; i < questionData.answers.length; i++) {
          const answerText = questionData.answers[i];
          const isCorrect = answerText === questionData.correctAnswer;
          
          await Resposta.create({
            texto_resposta: answerText,
            questao_id: question.id,
            correta: isCorrect
          });
        }
      }
      console.log('Questions and answers seeded successfully');
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}