const database = require('../models');

const verificaSeRoleTemPermissao = (permissoesExigidas) => {
    return async (req, res, next) => {
        
        const { usuarioId } = req;
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'roles_do_usuario',
                    include: [
                        {
                            model: database.permissoes,
                            as: 'permissoes_da_role',
                            attributes: ['nome']
                        }
                    ]
                }
            ],
            where: {
                id: usuarioId
            }
        });
        if(!usuario) return res.status(400).json({ message: 'Usuário não existe' });

        const temPermissao = usuario.roles_do_usuario
            .flatMap(role => role.permissoes_da_role)
            .map(permissao => permissao.nome)
            .some(nomePermissao => permissoesExigidas.includes(nomePermissao));

        if(!temPermissao) return res.status(400).json({ message: 'Usuário não tem acesso a rota' });

        return next();
    
    }
}

module.exports = verificaSeRoleTemPermissao;