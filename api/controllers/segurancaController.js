const SegurancaService = require('../services/segurancaService')

const segurancaService = new SegurancaService();

class SegurancaController {

    static cadastrarAcl = async(req, res) => {
        const { roles, permissoes } = req.body;
        const { usuarioId } = req;
        try {
            const acl = await segurancaService.cadastrarAcl({ roles, permissoes, usuarioId });
            return res.status(201).json(acl);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    static cadastrarPermissoesEmUmaRole = async (req, res) => {
        
        const { roleId, permissoes } = req.body; 
        try {
            const permissoesNaRole = await segurancaService.cadastrarPermissoesEmUmaRole({ roleId, permissoes });
            return res.status(201).json(permissoesNaRole);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
        
    }
}

module.exports = SegurancaController;