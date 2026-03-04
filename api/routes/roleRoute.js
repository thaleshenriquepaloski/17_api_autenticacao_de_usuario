const { Router } = require('express');
const RoleController = require('../controllers/roleController');

const router = Router();

router
    .post('/roles', RoleController.criarRole )
    .get('/roles', RoleController.buscarRoles )
    .get('/roles/:id', RoleController.buscarRolePorId )
    .put('/roles/:id', RoleController.editarRole )
    .delete('/roles/:id')

module.exports = router;