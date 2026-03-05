const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')
const verificaSeRoleTemPermissao = require('../middleware/verificarRoleTemPermissao')

const router = Router()

router
  .post(
    '/produto',
    verificaSeRoleTemPermissao(["cadastrar"]),
    ProdutoController.cadastrarProduto
  )
  .get('/produto', //somente estoquista pode listar todos os produtos
    ProdutoController.buscarTodosProdutos
  )
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router 