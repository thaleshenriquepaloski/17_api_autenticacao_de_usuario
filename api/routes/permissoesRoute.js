const { Router } = require('express');
const PermissaoController = require('../controllers/permissaoController')

const router = Router();

router
    .post('/permissao', PermissaoController.criarPermissao )
    .get('/permissao', PermissaoController.pegarTodasPermissoes )
    .get('/permissao/:id', PermissaoController.pegarPermissaoPorId )
    .put('/permissao/:id', PermissaoController.editarPermissao )
    .delete('/permissao/:id')

module.exports = router;