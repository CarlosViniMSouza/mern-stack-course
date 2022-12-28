import express from 'express';

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
    .route('/review')
    .post(ReviewsControl.apiPostReview)
    .put(ReviewsControl.apiUpdateReview)
    .delete(ReviewsControl.apiDeleteReview);

export default router;
