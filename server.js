const app = require('./app');
const { sequelize }  = require('./utils/migrate');
const PORT = process.env.PORT || 3000;

app.server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

sequelize
    .sync()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

process.on('SIGINT', () => {
    app.server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});