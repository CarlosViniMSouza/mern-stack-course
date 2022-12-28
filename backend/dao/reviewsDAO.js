import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

    static async injectDB(conn) {
    
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
        } catch (errorCode) {
            console.error(
                `Unable to establish collection handles in userDAO: ${errorCode}`
            );
        }
    }

    static async addReview(restaurantId, user, review, date) {

        try {
            const reviewDoc = { 
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            };

            return await reviews.insertOne(reviewDoc);
        } catch (errorCode) {
            console.error(`Unable to post review: ${errorCode}`);

            return { error: errorCode };
        }
    }

    static async updateReview(reviewId, userId, text, date) {

        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId)},
                { $set: { text: text, date: date  } },
            );

            return updateResponse;
            } catch (errorCode) {
                console.error(`Unable to update review: ${errorCode}`);

                return { error: errorCode };
        }
    }

    static async deleteReview(reviewId, userId) {

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            });

            return deleteResponse;
        } catch (errorCode) {
            console.error(`Unable to delete review: ${errorCode}`);

            return { error: errorCode };
        }
    }
}
