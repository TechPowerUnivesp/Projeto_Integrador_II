import Avaliacao from './Avaliacao.js'
import Questao from './Questao.js'
import Resposta from './Resposta.js'
import RespostasAluno from './RespostasAluno.js'
import Professor from './Professor.js'

// Definindo associações

// Relação entre Questao e Resposta
Questao.hasMany(Resposta, { foreignKey: 'questao_id', as: 'respostas' })
Resposta.belongsTo(Questao, { foreignKey: 'questao_id', as: 'questao' })

// Relação entre RespostasAluno e Avaliacao, Questao, Resposta
RespostasAluno.belongsTo(Avaliacao, {
  foreignKey: 'avaliacao_id',
  as: 'avaliacao',
})
RespostasAluno.belongsTo(Questao, { foreignKey: 'questao_id', as: 'questao' })
RespostasAluno.belongsTo(Resposta, {
  foreignKey: 'resposta_id',
  as: 'resposta',
})

export { Avaliacao, Questao, Resposta, RespostasAluno, Professor }
