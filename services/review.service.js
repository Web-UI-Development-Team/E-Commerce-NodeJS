const Review = require("../models/review.model")

const createNewReview = async (body) => {
    try {
        return await Review.create(body);
    }
    catch (error) {
        console.log(error);
    }
}

const getProductReviews = async (product) => {
    try {
        return await Review.find({ product }).populate('user')
    } catch (error) {
        console.log(error);
    }
}

const getReview = async (body) => {
    try {
        return await Review.findOne(body).populate('user');
    }
    catch (error) {
        console.log(error);
    }
}

const updateReview = async (_id, body) => {
    try {
        return await Review.updateOne({ _id }, body);
    }
    catch (error) {
        console.log(error);
    }
}

const deleteReview = async (_id) => {
    try {
        return await Review.deleteOne({_id});
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewReview,
    getReview,
    getProductReviews,
    updateReview,
    deleteReview
}