const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');
const config = require("./config/config");

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: 'postgres',
    port: 5432,
});

const umzug = new Umzug({
    migrations: {
        glob: path.join(__dirname, 'migrations/*.js'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
});

async function runMigrations() {
    try {
        console.log('Running migrations...');
        await umzug.up();
        console.log('Migrations executed successfully!');
    } catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    }
}

runMigrations();
