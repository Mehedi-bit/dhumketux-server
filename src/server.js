const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model')

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


async function startServer() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log(`Error connecting to mongodb ${err}`))
    
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

startServer();