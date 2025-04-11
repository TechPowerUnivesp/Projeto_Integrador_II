# Projeto_Integrador_III Grupo 009

Este trabalho é a continuidade do Projeto Integrador II do nosso grupo, o "Geoteca", um website para registro de fichas de estudos de conteúdos de Geografia.

<br>

## Integrantes do Projeto

### • [Eduardo Guerts](https://github.com/EduardoGuerts)

### • [Junior Barroso](https://github.com/)

### • [Leandro Rui](https://github.com/segueorui)

### • [Luana Tacuatia](https://github.com/luana-tacuatia)

### • [Marcelo Gigliotti](https://github.com/MSgigliotti)

### • [Matheus Cardoso](https://github.com/)

### • [Mauri Junior](https://github.com/maurijr1)

### • [Renan Santos](https://github.com/renan-r-santos)

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

### Configuração do Banco de Dados

O arquivo `db.js` na pasta `config` é responsável por configurar a conexão com o banco de dados MySQL utilizando o Sequelize e a biblioteca `mysql2`.

### Modelos

Os modelos `Professor` e ``são definidos na pasta`models` e representam as tabelas no banco de dados. Eles são configurados para não utilizar timestamps automáticos.

### Controladores

Os controladores `professorController.js` e ``na pasta`controllers` contêm a lógica de negócios para as operações de login e registro.

### Rotas

As rotas para login e registro de professores e alunos são definidas no arquivo `login.js` na pasta `routes`.

## Iniciar o projeto

Esse projeto foi desenvolvido usando Node.js versão 20.17.0.
Para instalação das dependências, abra um terminal, navegue até os diretórios src/api e src/client e execute o comando:

```sh
npm install
```

### Iniciar o back-end

No terminal, navegue até o diretório `src/api` e execute os comando:

```sh
npm run start
```

### Iniciar o front-end

Para iniciar o front-end, navegue até o diretório `src/client` e execute o comando:

```sh
npm run dev
```

### Database

docker run --rm -it -p 3306:3306 -e MARIADB_ROOT_PASSWORD=741852 -e MARIADB_DATABASE=geoteca --name pi3 mariadb:latest
