const database = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonsecret = require('../config/jsonSecretJwt');

class AuthService {
    login = async (dto) => {
        const usuarioExiste = await database.usuarios.findOne({
            attributes: ['id', 'email', 'senha'],
            where: {
                email: dto.email
            }
        });

        if(!usuarioExiste) throw new Error('Usuário não cadastrado');

        const senhaEhIgual = await compare(dto.senha, usuarioExiste.senha);

        if(!senhaEhIgual) throw new Error('Usuário ou senha incorretos!');

        const accessToken = sign({
            id: usuarioExiste.id,
            email: usuarioExiste.email
        }, jsonsecret.secret, { expiresIn: 86400});

        return { accessToken };
    }
}

module.exports = AuthService;