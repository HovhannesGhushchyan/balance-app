const { Sequelize } = require('sequelize');
const { User, sequelize } = require('../models/user');

const createUser = async (initialBalance = 10000) => {
    try {
        const user = await User.create({ balance: initialBalance });
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

const updateBalance = async (userId, amount) => {
    const transaction = await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
        const user = await User.findByPk(userId, {
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!user) {
            throw new Error('User not found');
        }

        const newBalance = user.balance + amount;
        if (newBalance < 0) {
            throw new Error('Insufficient funds');
        }

        user.balance = newBalance;
        await user.save({ transaction });

        await transaction.commit();

        return user;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    updateBalance,
    createUser
};