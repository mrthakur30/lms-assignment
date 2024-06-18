import Membership from '../models/Membership.js';

const addMembership = async (req, res) => {
    const { userId, type } = req.body;
    const startDate = new Date();
    const endDate = new Date(startDate);
    if (type === '6 months') endDate.setMonth(endDate.getMonth() + 6);
    if (type === '1 year') endDate.setFullYear(endDate.getFullYear() + 1);
    if (type === '2 years') endDate.setFullYear(endDate.getFullYear() + 2);

    const membership = new Membership({ userId, type, startDate, endDate });
    await membership.save();
    res.status(201).json(membership);
};

const updateMembership = async (req, res) => {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!membership) {
        return res.status(404).json({ message: 'Membership not found' });
    }
    res.json(membership);
};

const deleteMembership = async (req, res) => {
    const membership = await Membership.findByIdAndDelete(req.params.id);
    if (!membership) {
        return res.status(404).json({ message: 'Membership not found' });
    }
    res.json({ message: 'Membership deleted successfully' });
};

const getMemberships = async (req, res, next) => {
    const memberships = await Membership.find();
    res.json(memberships);
};

const getMembershipById = async (req, res) => {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
        return res.status(404).json({ message: 'Membership not found' });
    }
    res.json(membership);
};

export  {
    addMembership,
    updateMembership,
    deleteMembership,
    getMemberships,
    getMembershipById,
};
