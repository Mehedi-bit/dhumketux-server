const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

async function mongoConnect() {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to the database!"))
    .catch((err) => console.log(`Error connecting to mongodb ${err}`))
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}


module.exports = {
    mongoConnect,
    mongoDisconnect,
}