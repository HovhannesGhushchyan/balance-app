const { updateBalance, createUser } = require('../services/userService');

const updateUserBalance = async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await updateBalance(userId, amount);
        res.json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const createUserBalance = async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await createUser(amount);
        res.json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    updateUserBalance,
    createUserBalance
};