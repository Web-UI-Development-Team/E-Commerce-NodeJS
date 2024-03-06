const Rating = require("../models/rating.model")

const createNewRating = async (body) => {
    try {
        return await Rating.create(body);
    }
    catch (error) {
        console.log(error);
    }
}

const getAllRates = async (product) => {
    try {
        return await Rating.find({product});
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewRating,
    getAllRates
}