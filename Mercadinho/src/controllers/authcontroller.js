import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRETA; // .env
console.log(SECRET);

export async function login(req, res) {
    const { email, senha } = req.body;

    if (email === 'manel@gmail.com' && senha === 'manel') {
        const token = jwt.sign({ id: 1, name: 'Manel' }, SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Credenciais inválidas' });
}