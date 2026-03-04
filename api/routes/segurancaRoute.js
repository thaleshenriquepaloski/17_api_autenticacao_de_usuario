const { Router } = require('express');
const SergurancaController = require('../controllers/segurancaController');

const router = Router();

router
    .post('/seguranca/acl', SergurancaController.cadastrarAcl )
    .post('/seguranca/permissoes-roles', SergurancaController.cadastrarPermissoesEmUmaRole )

module.exports = router;