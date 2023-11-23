import express from 'express'

import cors from 'cors'
const app = express()
const port = 4000 
//IMPORT ROUTES API
import rotasGames from './routes/games.js'
import rotasUsuarios from './routes/usuario.js'

//Habilita o CORS Cross-Origin resource sharing
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:4000'] //informe outras URL´s se necessário
}));
app.use(express.json()) // irá fazer o parse de arquivos JSON
//Rotas de conteúdo público
app.use('/', express.static('public'))
//SETTINGS FAVICON
app.use('/favicon.ico', express.static('public/images/controle2.jpg'))
//ROUTES API
app.use('/api/games', rotasGames)
app.use('/api/usuarios', rotasUsuarios)
app.get('/api', (req, res) => {
    res.status(200).json({
        message: '☄️ API Fatec 100% funcional ☄️',
        version: '1.0.1'
    })
})

app.use(function (req, res) {
    res.status(404).json({
        erros: [{
            value: `${req.originalUrl}`,
            message: `A rota ${req.originalUrl} não faz parte dessa API!`,
            param: 'Invalid Route'
        }]
    })
})
app.listen(port, function () {
    console.log(` 🤖 Servidor rodando na porta ${port}`)

})
