const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const users = [{ id: uuidv4(), username: 'admin', password: 'password' }];

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.logout = (req, res) => {
    res.json({ message: 'Sesión cerrada' });
};