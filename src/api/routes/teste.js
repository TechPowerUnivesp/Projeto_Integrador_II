import bcrypt from 'bcrypt'

// Testar a senha manualmente
const senha = 'senha123'
const hashArmazenado = 'senha123' // Hash da senha armazenado no banco para o professor 'joao'

bcrypt.compare(senha, hashArmazenado, (err, result) => {
  if (err) {
    console.error('Erro ao comparar senha:', err)
  } else if (result) {
    console.log('Senha correta!')
  } else {
    console.log('Senha incorreta.')
  }
})
