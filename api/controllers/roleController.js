const RoleService = require('../services/roleService');

const roleService = new RoleService();

class RoleController {

    static criarRole = async (req, res) => {
        const { nome, descricao } = req.body;
        try {
            const roleCriada = await roleService.criarRole({nome, descricao});
            return res.status(201).json(roleCriada);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static buscarRoles = async (req, res) => {
        try {
            const roles = await roleService.buscarRoles();
            return res.status(201).json(roles);
        } catch {
            return res.status(400).json({ message: error.message });
        }

    }

    static buscarRolePorId = async (req, res) => {
        const id = req.params.id;
        try {
            const role = await roleService.buscarRolePorId(id);
            return res.status(201).json(role);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static editarRole = async (req, res) => {
        const id = req.params.id;
        const { nome, descricao } = req.body;
        try {
            const roleEditada = await roleService.editarRole({ id, nome, descricao });
            return res.status(201).json({ Message: 'Role editada com sucesso', roleEditada });
        } catch {
            return res.status(400).json({ message: error.message });
        }
    }

    static deletarRole = async (req, res) => {
        
    }
}

module.exports = RoleController;