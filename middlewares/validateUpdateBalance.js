const validateUpdateBalance = (req, res, next) => {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
        return res.status(400).json({ success: false, message: 'userId and amount are required' });
    }

    if (typeof amount !== 'number') {
        return res.status(400).json({ success: false, message: 'amount must be a number' });
    }

    next();
};

module.exports = validateUpdateBalance;