const database = require('../models');

const verificarPermissaoDoUsuario = (permissoesExigidas) => {
    return async (req, res, next) => {
        
        const { usuarioId } = req;

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'permissoes_do_usuario',
                    attributes: [ 'id', 'nome', 'descricao' ]
                }
            ],
            where: { id: usuarioId }
        });
        if(!usuario) return res.status(401).json({ message: 'Usuário não cadastrado'});

        const permissoesCadastradas = usuario.permissoes_do_usuario
            .map((permissao) => permissao.nome)
            .some((permissao) => permissoesExigidas.includes(permissao))

        if(!permissoesCadastradas) return res.status(401).json({ message: 'Usuário não possui acesso' });

        return next();
    }
}

module.exports = verificarPermissaoDoUsuario;