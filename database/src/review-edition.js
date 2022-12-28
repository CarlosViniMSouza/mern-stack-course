exports = async function(payload, response) {

    if(payload.body) {
        const date = new Date();
        const body = EJSON.parse(payload.body.text());
        const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");

        const updateResponse = await reviews.updateOne(
            { user_id: body.user_id, _id: BSON.ObjectId(body.review_id)},
            { $set: { text: body.text, date: date  } },
        );

        return updateResponse;
    }

    return {};
};
