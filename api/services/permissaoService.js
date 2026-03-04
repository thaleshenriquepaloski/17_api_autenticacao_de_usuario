const database = require('../models');
const uuid = require('uuid');

class PermissaoService {

    criarPermissao = async (dto) => {
        try {
            const permissaoExiste = await database.permissoes.findOne({
                where: {
                    nome: dto.nome
                }
            });
            if(permissaoExiste) throw new Error('Permissão já existe na tabela');

            const novaPermissao = await database.permissoes.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return novaPermissao
        } catch (error) {
            throw error;
        }
    }

    pegarTodaPermissoes = async () => {
        return await database.permissoes.findAll();
    }

    pegarPermissaoPorId = async (id) => {
        const permissao = await database.permissoes.findOne({
            where: { id }
        });
        return permissao;
    }

    editarPermissao = async (dto) => {
        const permissaoExiste = await this.pegarPermissaoPorId(dto.id);
        if(!permissaoExiste) throw new Error('Permissão não foi encotrada');

        try {
            if(permissaoExiste.nome !== undefined) {
                permissaoExiste.nome = dto.nome;
            }
            if(permissaoExiste.descricao !== undefined) {
                permissaoExiste.descricao = dto.descricao;
            }
            await permissaoExiste.save();
            return permissaoExiste;
        } catch (error) {
            throw error
        }
    }

    deletarPermissao = async () => {
        // deixar como atividade extra
    }
}

module.exports = PermissaoService;