import Professor from '../models/Professor.js'

const professorController = {
  login: async (req, res) => {
    const { username, password } = req.body

    console.log('Tentativa de login:', username)

    try {
      const professor = await Professor.findOne({ where: { username } })

      if (!professor) {
        console.log('Usuário não encontrado:', username)
        return res
          .status(401)
          .json({ success: false, message: 'Usuário não encontrado' })
      }

      // Verificar se a senha está correta (sem bcrypt)
      if (password !== professor.password) {
        console.log('Senha incorreta para o usuário:', username)
        return res
          .status(401)
          .json({ success: false, message: 'Senha incorreta' })
      }

      console.log('Login bem-sucedido para o usuário:', username)
      res.status(200).json({ success: true, message: 'Login bem-sucedido' })
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      res
        .status(500)
        .json({ success: false, message: 'Erro no servidor ao fazer login' })
    }
  },

  register: async (req, res) => {
    const { username, password } = req.body

    try {
      // Inserir o novo usuário no banco de dados (sem bcrypt)
      const professor = await Professor.create({ username, password })

      if (professor) {
        console.log('Usuário registrado com sucesso:', username)
        res
          .status(201)
          .json({ success: true, message: 'Usuário registrado com sucesso' })
      } else {
        console.error('Erro ao registrar usuário:', username)
        res.status(500).json({
          success: false,
          message: 'Erro no servidor ao registrar usuário',
        })
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      res.status(500).json({
        success: false,
        message: 'Erro no servidor ao registrar usuário',
      })
    }
  },
}

export default professorController
