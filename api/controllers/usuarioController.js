const UsuarioService = require('../services/usuarioService');

const usuarioService = new UsuarioService;

class UsuarioController {

    static cadastrarUsuario = async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const usuario = await usuarioService.cadastrarUsuario({ nome, email, senha });
            return res.status(201).json({ message: `Usuário criado`, usuario });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static buscarTodosUsuarios = async(req, res) => {
        try {
            const usuarios = await usuarioService.buscarTodosUsuarios();
            return res.status(201).json(usuarios);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static buscarUsuarioPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const usuarios = await usuarioService.buscarUsuarioPorId(id);
            return res.status(201).json(usuarios);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    // finalizar com buscar todos os usuarios; buscar usuario por id; editar usuário ; deletar usuário 
}

module.exports = UsuarioController;