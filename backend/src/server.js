import express from 'express';
import cors from 'cors';
import restaurants from '../api/restaurants.route.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/restaurants", restaurants);

app.get('/', (req, res) => {
    return res.status(404).send({ error: 'Page Not Found' });
});

export default app;
