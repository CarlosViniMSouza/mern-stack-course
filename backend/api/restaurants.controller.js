import RestaurantsDAO from '../dao/restaurantsDAO.js';

export default class RestaurantsController {
    
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters, page, restaurantsPerPage        
        });

        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entriesPerPage: restaurantsPerPage,
            totalResults: totalNumRestaurants
        };

        res.json(response);
    };

    static async apiGetRestaurantById(req, res, next) {
        
        try {
            let id = req.params.id || {};
            let restaurant = await RestaurantsDAO.getRestaurantByID(id);

            if(!restaurant) {
                return res.status(404).json({ error: ' Restaurant Not Found' });
            }

            res.json(restaurant);
        } catch (errorCode) {
            console.log(`api ${errorCode}`);

            res.status(500).json({ error: errorCode });
        }
    };

    static async apiGetRestaurantCuisines(req, res, next) {

        try {
            let cuisines = await RestaurantsDAO.getCuisines();
            res.json(cuisines);
        } catch (errorCode) {
            console.log(`api ${errorCode}`);

            res.status(500).json({ error: errorCode });
        };
    };
}
