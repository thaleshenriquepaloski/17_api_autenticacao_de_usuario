const database = require('../models');
const sequelize = require('sequelize');

class SegurancaService {

    cadastrarAcl = async (dto) => {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'roles_do_usuario',
                    attributes: [ 'id', 'nome', 'descricao' ]
                },
                {
                    model: database.permissoes,
                    as: 'permissoes_do_usuario',
                    attributes: [ 'id', 'nome', 'descricao' ]
                }
            ],
            where: {
                id: dto.usuarioId
            }
        })
        if(!usuario) throw new Error('Usuário não existe no banco de dados!');

        const rolesCadastradas = await database.roles.findAll({
            where: {
                id: {
                    [sequelize.Op.in]: dto.roles
                }
            }
        })

        const permissoesCadastradas = await database.permissoes.findAll({
            where: {
                id: {
                    [sequelize.Op.in]: dto.permissoes
                }
            }
        })

        await usuario.setRoles_do_usuario(rolesCadastradas);
        await usuario.setPermissoes_do_usuario(permissoesCadastradas);

        const novoUsuario = await database.usuarios.findOne({
            include: [
                {
                    model: database.roles,
                    as: 'roles_do_usuario',
                    attributes: [ 'id', 'nome', 'descricao' ]
                },
                {
                    model: database.permissoes,
                    as: 'permissoes_do_usuario',
                    attributes: [ 'id', 'nome', 'descricao' ]
                }
            ],
            where: {
                id: dto.usuarioId
            } 
        })
        return novoUsuario;
    }

    cadastrarPermissoesEmUmaRole = async (dto) => {

        const role = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'permissoes_da_role',
                    attributes: [ 'id', 'nome', 'descricao' ]
                }
            ],
            where: { id: dto.roleId }
        });
        if(!role) throw new Error('A role não foi encontrada!');

        const permissoesParaIncluirNaRole = await database.permissoes.findAll({
            where: {
                id: {
                    [sequelize.Op.in]: dto.permissoes
                }
            }
        });

        await role.setPermissoes_da_role(permissoesParaIncluirNaRole);

        const novaRole = await database.roles.findOne({
            include: [
                {
                    model: database.permissoes,
                    as: 'permissoes_da_role',
                    attributes: [ 'id', 'nome', 'descricao' ]
                }
            ],
            where: { id: dto.roleId }
        });

        return novaRole;
        
    }
}

module.exports = SegurancaService;