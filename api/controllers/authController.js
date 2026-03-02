const AuthService = require('../services/authService');

const authService = new AuthService;

class AuthController {

    static login = async(req, res) => {
        const { email, senha } = req.body;
        try {
            const login = await authService.login({ email, senha });
            return res.status(200).send(login);
        } catch (error) {
            return res.status(401).json({ erro: error.message });
        }
    }
}

module.exports = AuthController;