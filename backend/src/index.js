import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 6060;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI, 
    {
        maxPoolSize: 50,
        writeConcern: 250,
    }).catch(err => {
        console.log(err.stack),
        process.exit(1);
    }).then(async client => {
        app.listen(port, () => {
            console.log(`\nServer listening on PORT ${port}`)
        });
    }
);