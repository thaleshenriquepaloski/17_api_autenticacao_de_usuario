const PermissaoService = require('../services/permissaoService');

const permissaoService = new PermissaoService();

class PermissaoController {

    static criarPermissao = async (req, res) => {
        const { nome, descricao } = req.body;
        try {
            const novaPermissao = await permissaoService.criarPermissao({ nome, descricao });
            return res.status(200).json(novaPermissao);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static pegarTodasPermissoes = async (req, res) => {
        try{
            const permissoes = await permissaoService.pegarTodaPermissoes();
            return res.status(200).json(permissoes);
        } catch {
            return res.status(400).json({ message: error.message });
        }
    }

    static pegarPermissaoPorId = async (req, res) => {
        const id = req.params.id;
        try {
            const permissao = await permissaoService.pegarPermissaoPorId(id);
            return res.status(200).json(permissao);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static editarPermissao = async (req, res) => {
        const id = req.params.id;
        const { nome, descricao } = req.body;
        try {
            const permissaoAtualizada = await permissaoService.editarPermissao({ id, nome, descricao });
            return res.status(200).json(permissaoAtualizada);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static deletarPermissao = async (req, res) => {
        //atividade extra
    }
}

module.exports = PermissaoController;