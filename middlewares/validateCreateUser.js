const validateCreateUser = (req, res, next) => {
    const { amount } = req.body;

    if (typeof amount !== 'number') {
        return res.status(400).json({ success: false, message: 'amount must be a number' });
    }

    next();
};

module.exports = validateCreateUser;