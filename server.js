require("dotenv").config();
const { createApp } = require('./app')
const appDataSource = require('./models/dataSource');

// app.get('/ping', (req, res) => {
//     res.json({ message: 'pong' });
// });

const startServer = async () => {
    const app = createApp();
    const PORT = process.env.PORT;

    await appDataSource.initialize()
        .then(() => {
        console.log("Data Source has been initialized");
        })
        .catch(() => {
        console.log("Errors occurred in Data Source initializing");
        appDataSource.destroy();
        })
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
}

startServer();