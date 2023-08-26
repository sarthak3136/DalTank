const {MongoClient} = require('mongodb');

const options = {useNewUrlParser: true, useUnifiedTopology: true};
const uri = process.env.MONGO_URI || 'mongodb+srv://tr335214:root@cluster0.zxzknl9.mongodb.net/';


const client = new MongoClient(uri, options);

async function connectToDB() {
    try {
        await client.connect();
        return client.db('Web');
    } catch (error) {
        console.error(error);
    }
}

async function closeConnection() {
    try {
        await client.close();
    } catch (error) {
        console.error(error);
    }
}

module.exports = {connectToDB, closeConnection};
