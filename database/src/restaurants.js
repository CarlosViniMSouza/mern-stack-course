exports = async function(payload, response) {

    const { restaurantsPerPage=20, page=0 } = payload.query;
    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    
    let restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray();
    let query = {};

    const responseData = {
        restaurants: restaurantsList,
        page: page.toString(),
        filters: {},
        entriesPerPage: restaurantsPerPage.toString(),
        totalResults: restaurantsList.length.toString()
    };

    if (payload.query.cuisine) {
        query = { $text: { $search: payload.query.cuisine } }
    } 

    else if (payload.query.zipcode) {
        query = { "address.zipcode": { $eq: payload.query.zipcode } }
    }

    else if (payload.query.name) {
        query = { $text: { $search: payload.query.name } }
    }

    restaurants.forEach(restaurant => {
        restaurant._id = restaurant._id.toString();
    });

    return responseData;
};
