import bcrypt from 'bcrypt'
const saltRounds = 10

const senhas = ['senha123', 'senha456', 'senha789']

senhas.forEach((senha) => {
  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) throw err
    console.log(`Senha original: ${senha} -> Hash: ${hash}`)
    // Atualize o banco de dados aqui com a senha criptografada (hash)
  })
})
