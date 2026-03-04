const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const verificaRolesDoPerfil = require('../middleware/verificaPerfilUsuario')
const verificarPermissaoDoUsuario = require('../middleware/verificarPermissoesDeUsuario')

const router = Router()

router
  .post(
    '/produto',
    verificarPermissaoDoUsuario(["criar", "deletar", "editar"]),
    ProdutoController.cadastrarProduto
  )
  .get('/produto', //somente estoquista pode listar todos os produtos
    verificarPermissaoDoUsuario(['listar']),
    ProdutoController.buscarTodosProdutos
  )
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router 