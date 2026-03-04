const database = require('../models')

const verificaRolesDoPerfil = (rolesPermitidas) => {
    return async (req, res, next) => {

        const { usuarioId } = req

        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'roles_do_usuario',
                    attributes: ['id', 'nome', 'descricao']
                }
            ],  
            where: { id: usuarioId }
        });
        if(!usuario) return res.status(401).json({ message: 'Usuário não cadastrado' });

        const rolesCadastradas = usuario.roles_do_usuario
            .map((role) => role.nome)
            .some((role) => rolesPermitidas.includes(role));


        if(!rolesCadastradas) return res.status(401).json('Usuário não possui acesso a essa rota');

        return next();
    }
}

module.exports = verificaRolesDoPerfil;