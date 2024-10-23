# Projeto_Integrador_II Grupo 021

Este trabalho é o aperfeiçoamento do Projeto Integrador I do nosso grupo, o “Geoteca”, um website para registro de fichas de estudos de conteúdos de Geografia.

<br>

## Integrantes do Projeto

### • [Eduardo Guerts](https://github.com/EduardoGuerts)

### • [Leandro Rui](https://github.com/segueorui)

### • [Luana Tacuatia](https://github.com/luana-tacuatia)

### • [Marcelo Gigliotti](https://github.com/MSgigliotti)

### • [Mauri Junior](https://github.com/maurijr1)

## Descrição do Front-end

O Frontend utiliza o Axios para fazer uma requisição HTTP, como um POST para o endpoint /login no servidor backend.

## Descrição do Back-end

O Backend é construído utilizando Node.js e Express para criar uma API RESTful. O Sequelize é usado como ORM (Object-Relational Mapper) para interagir com o banco de dados MySQL, utilizando a biblioteca `mysql2` para a conexão.

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework web para Node.js, utilizado para criar a API RESTful.
- **Sequelize**: ORM para Node.js, utilizado para interagir com o banco de dados MySQL.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **mysql2**: Biblioteca para conectar ao banco de dados MySQL.

### Estrutura do Projeto

### Configuração do Banco de Dados

O arquivo `db.js` na pasta `config` é responsável por configurar a conexão com o banco de dados MySQL utilizando o Sequelize e a biblioteca `mysql2`.

### Modelos

Os modelos `Professor` e ``são definidos na pasta`models` e representam as tabelas no banco de dados. Eles são configurados para não utilizar timestamps automáticos.

### Controladores

Os controladores `professorController.js` e ``na pasta`controllers` contêm a lógica de negócios para as operações de login e registro.

### Rotas

As rotas para login e registro de professores e alunos são definidas no arquivo `login.js` na pasta `routes`.

### Iniciar o Backend

Para iniciar o back-end, abra um terminal, navegue até o diretório `src/api` e execute o comando:

```sh
npm run start
```

### Iniciar o Front-end

Para iniciar o front-end, abra um terminal, navegue até o diretório `src/client` e execute o comando:

```sh
npm run dev
```
