const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
    
    cadastrarUsuario = async (dto) => {
        
        const usuarioExiste = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        });

        if(usuarioExiste) throw new Error('Usuário já cadastrado!');
        
        try {

            const senhaHasheada = await hash(dto.senha, 8);
            
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHasheada
            });
            return novoUsuario;

        } catch (error) {
            throw new Error('Erro ao cadastrar usuário');
        }

    };

    buscarTodosUsuarios = async () => {
        return database.usuarios.findAll();
    };

    buscarUsuarioPorId = async (id) => {
        const usuario = await database.usuarios.findOne({
            where: {
                id: id
            }
        })
        if(!usuario) throw new Error('Nenhum usuário encontrado!');
        return usuario;
    };

    editarUsuario = async (dto) => {
        const usuario  = await this.buscarUsuarioPorId(dto.id);
        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email;
            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error('Erro ao editar usuário!');
        }
    };

    deletarUsuario = async (id) => {
        await this.buscarUsuarioPorId(id);
        try {
            await database.usuarios.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar usuário');
        }
    }
    // finalizar com buscar todos os usuarios; buscar usuario por id; editar usuário ; deletar usuário 
}

module.exports = UsuarioService;