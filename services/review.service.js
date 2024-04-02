const Review = require("../models/review.model")

const createNewReview = async (body) => {
    try {
        return await Review.create(body);
    }
    catch (error) {
        console.log(error);
    }
}

const getReview = async (body) => {
    try {
        return  await Review.findOne(body).populate('user');
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewReview,
    getReview
}