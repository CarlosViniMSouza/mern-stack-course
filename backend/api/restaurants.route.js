import express from 'express';

const router = express.Router();
const sampleRestaurant = {
    "_id": {
        "$oid":"5eb3d668b31de5d588f4292a"
    },
    "address": {
        "building": "2780",
        "coord": [
            {
                "$numberDouble": "-73.98241999999999"
            },
            {
                "$numberDouble": "40.579505"
            }
        ],
        "street": "Stillwell Avenue",
        "zipcode":"11224"
    },
    "borough": "Brooklyn",
    "cuisine": "American",
    "grades": [{
        "date": {
            "$date": {"$numberLong": "1402358400000"}
        },
        "grade": "A",
        "score": {"$numberInt": "5"}
    },
    {
        "date": {
            "$date":{"$numberLong": "1370390400000"}
        },
        "grade": "A",
        "score": {"$numberInt": "7"}
    },
    {
        "date": {
            "$date": {"$numberLong": "1334275200000"}
        },
        "grade": "A",
        "score": {"$numberInt":"12"}
    },
    {
        "date": {"$date": {
            "$numberLong":"1318377600000"}
        },
        "grade": "A",
        "score": {"$numberInt":"12"}
    }],
        "name": "Riviera Caterer",
        "restaurant_id": "40356018"
}

router.get('/', (req, res) => {
    res.status(200).send(sampleRestaurant);
});

export default router;