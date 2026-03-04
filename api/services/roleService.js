const database = require('../models');
const uuid = require('uuid');

class RoleService {

    criarRole = async (dto) => {
        const roleExiste = await database.roles.findOne({
            where: {
                nome: dto.nome
            }
        });
        if(roleExiste) throw new Error('Role já está cadastrada');

        const novaRole = await database.roles.create({
            id: uuid.v4(),
            nome: dto.nome,
            descricao: dto.descricao
        });

        return novaRole;
    }

    buscarRoles = async () => {
        return await database.roles.findAll();
    }

    buscarRolePorId = async (id) => {
        const role = await database.roles.findOne({
            where: { id }
        });
        return role;
    }

    editarRole = async (dto) => {
        const role = await this.buscarRolePorId(dto.id);
        
        try {
            if(!role) throw new Error('Role não encontrada');
    
            if(role.nome !== undefined) {
                role.nome = dto.nome
            }
            if(role.descricao !== undefined) {
                role.descricao = dto.descricao
            }
            await role.save()
            return role;
        } catch (error) {
            throw error;
        }
    }

    deletarRole = async () => {
        // fazer como atividade hora qualquer
    }

}

module.exports = RoleService;