# 🌍 BackEnd com Node.js integrado ao banco MongoDB 🌍

>> Este Projeto está sendo desenvolvido baseado na disciplina de laboratório de Banco de Dados

## 🚨Pacotes Necessário para Aplicação 🚨
1. Express
2. MongoDB 

## Integrantes 
1. Matheus Rezende Borges
2. Renan Goes Santos

3. 🎯Objetivo
A API da Games tem como objetivo gerenciar informações sobre os Detalhes dos Jogos. Ela fornece operações básicas, como criar, recuperar, atualizar e excluir informações sobre Jogos.
Após o usuário se cadastrar na pag Cadastro ele devera clicar no nome Black&Purple para ser redirecionado para Pag Home onde podera Interagir com as Demais Paginas


📦Packages Utilizados
npm i express
npm i mongodb@4.2
npm i dotenv
npm i nodemon --dev
npm i express-validator
npm i bcryptjs
npm i jsonwebtoken
npm i cors

📝Função de cada um dos pacotes
Pacote	Descrição
express	Framework web rápido, flexível e minimalista para Node.js.
mongodb	Driver oficial do MongoDB para Node.js.
dotenv	Carrega variáveis ​​de ambiente do arquivo .env para o processo.env.
cors	Middleware que permite a comunicação entre diferentes domínios na web.
express-validator	Middleware para validação de dados de entrada em solicitações HTTP.
nodemon (dev)	Ferramenta que monitora as alterações no código-fonte e reinicia automaticamente o servidor.
jsonwebtoken	Implementação do JWT em NodeJS
bcryptjs	Bcrypt é um algoritmo de geração de hashs para senhas
cors	Habilita o CORS Cross-Origin resource sharing
➡ Rotas e Funcionalidades

Listar Todos os Jogos

Rota: GET /api/games
Descrição: Retorna a lista de todos os jogadores cadastrados.
Exemplo de Requisição HTTP:

GET http://localhost:4000/api/games
Content-Type: application/json
Obter ganmes por ID
Rota: GET /api/games/id/:id
Descrição: Retorna as informações de um jogo específico com base no ID.
Exemplo de Requisição HTTP:
