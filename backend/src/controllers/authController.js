import User  from '../models/User.js';
import jwt from 'jsonwebtoken';   
import { hash, compare } from 'bcrypt';

const { sign} = jwt;

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // if (!user || !await compare(password, user.password)) {
    //     return res.status(401).json({ message: 'Invalid credentials' });
    // }
    const token = sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ tokeN : token, userId : user._id });
};

export {
    register,
    login
};
