//API REST DOS GAMES
import express from 'express';
import { connectToDatabase } from '../utils/gamesmongodb.js';
import { check, validationResult } from 'express-validator';

const router = express.Router()
const { db, ObjectId } = await connectToDatabase()
const nomeCollection = 'games'

import auth from '../middleware/auth.js'

const validaGames = [
    check('nome')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome do jogo')
        .isAlphanumeric('pt-BR', { ignore: '/ . : ,' }),

    check('premiacao')
        .not().isEmpty().trim().withMessage('É obrigatório informar a premiação')
        .isAlphanumeric('pt-BR', { ignore: '/ . : ,' })
        .withMessage('A premiação não deve conter caracteres especiais')
        .isLength({ min: 2 }).withMessage('A premiação é muita curta. Mínimo 2')
        .isLength({ max: 800 }).withMessage('A premiação é muito longa. Máximo 800'),

    check('categoria')
        .not().isEmpty().trim().withMessage('É obrigatório informar a ctaegoria')
        .isAlphanumeric('pt-BR', { ignore: '/ . : ,' })
        .withMessage('A categoria não deve conter caracteres especiais')
        .isLength({ min: 2 }).withMessage('A categoria é muita curta. Mínimo 2')
        .isLength({ max: 200 }).withMessage('A categoria é muito longa. Máximo 200'),

    check('plataformas')
        .not().isEmpty().trim().withMessage('É obrigatório informar a plataforma')
        .isAlphanumeric('pt-BR', { ignore: '/ . : ,' })
        .withMessage('A plataforma não deve conter caracteres especiais')
        .isLength({ min: 2 }).withMessage('A plataforma é muita curta. Mínimo 2')
        .isLength({ max: 200 }).withMessage('A plataforma é muito longa. Máximo 200'),

    check('Desenvolvedora')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome da Desenvolvedora')
        .isAlphanumeric('pt-BR', { ignore: '/ . : ,' })
        .withMessage('O nome da Desenvolvedora não deve conter caracteres especiais')
        .isLength({ min: 1 }).withMessage('O nome é muito pequeno. Mínimo 4')
        .isLength({ max: 200 }).withMessage('O nome é muito grande. Máximo 20'),

    check('trofeus')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome do trofeu')
        .isLength({ min: 2 }).withMessage(' Mínimo 2')
        .isLength({ max: 3 }).withMessage(' Máximo 700'),
]

//GET /API/GAMES
//LISTA TODOS OS GAMES

router.get('/', async (req, res) => {
    try {
        db.collection(nomeCollection).find().sort({ nome: 1 })
            .toArray((err, docs) => {
                if (!err) {
                    res.status(200).json(docs)
                }
            })
    } catch (err) {
        res.status(500).json({
            errors: [{
                value: `${err.message}`,
                msg: 'Erro ao obter a Listagem dos Games',
                param: '/'
            }]
        })
    }
});


router.get('/id/:id', async (req, res) => {
    try {
        db.collection(nomeCollection).find({ '_id': { $eq: ObjectId(req.params.id) } })
            .toArray((err, docs) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.status(200).json(docs)
                }
            })
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})
/*
 * GET  /API/GAMES/games:games
 * LISTA OS OS GAMES PELO NOME
 */
router.get('/nome/:nome', async (req, res) => {
    try {
        db.collection(nomeCollection)
            .find({ 'nome': { $regex: req.params.nome, $options: "i" } }).sort({ nome: -1 })
            .toArray((err, docs) => {
                if (err) {
                    res.status(400).json(err) //bad resquest
                } else {
                    res.status(200).json(docs) //retorna documento
                }
            })
    } catch (err) {
        res.status(500).json({ "erro": err.message })
    }
})
/*
 * DELETE /API/GAMES/ : ID
 * APAGA TODOS OS GAMES PELO ID
 */

router.delete('/:id', async (req, res) => {
    await db.collection(nomeCollection)
        .deleteOne({ "_id": { $eq: ObjectId(req.params) } })
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).json(err))
});
/*
 * POST /API/GAMES/ : ID
 * INSIRA UM NOVO GAMES 
 */
router.post('/', validaGames, async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json(({
            erros: erros.array()

        }))
    } else {
        await db.collection(nomeCollection)
            .insertOne(req.body)
            .then(result => res.status(200).send(result))
            .catch(err => res.status(400).json(err))
    }
});
/*
 * PUT /API/GAMES/ : ID
 * ALTERA UM NOVO GAME
 */
router.put('/', validaGames, async (req, res) => {
    let idDocumento = req.body._id  //armazenando o id documento
    delete req.body._id //iremos remover o id do body
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json(({
            erros: erros.array()
        }))
    } else {
        await db.collection(nomeCollection)
            .updateOne({ '_id': { $eq: ObjectId(idDocumento) } },
                { $set: req.body })
            .then(result => res.status(200).send(result))
            .catch(err => res.status(400).json(err))
    }
});

router.get('/nome', async (req, res) => {
    try {
        db.collection(nomeCollection).find({
            nome: /^V/
        }).toArray((err, docs) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(docs);
            }
        });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

router.get('/trofeus', async (req, res) => {
    try {
        db.collection(nomeCollection).find({
            'trofeus': { $gte: 1, $lte: 229 } 
        }).toArray((err, docs) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(docs);
            }
        });
    } catch (err) {
        res.status(500).json({ "error": err.message });
    }
});

export default router 