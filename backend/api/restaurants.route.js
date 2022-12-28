import express from 'express';

import RestaurantsControl from "./restaurants.controller.js"
import ReviewsControl from "./reviews.controller.js"

const router = express.Router();

router.route("/").get(RestaurantsControl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsControl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsControl.apiGetRestaurantCuisines);

router
    .route('/review')
    .post(ReviewsControl.apiPostReview)
    .put(ReviewsControl.apiUpdateReview)
    .delete(ReviewsControl.apiDeleteReview);

export default router;
