import User from '../models/User.js';

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};

const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
};

const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
