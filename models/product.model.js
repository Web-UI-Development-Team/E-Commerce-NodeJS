const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: [true, "duplicated product"],
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    price: {
        type: Number,
        required: true,
        required: [true, "price is required"]
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        required: [true, "stock is required"]
    },
    brand: {
        type: String,
        required: true,
        required: [true, "branc is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'category is required']
    },
    thumbnail: {
        type: String,
        required: [true, 'thumbnail is required']
    },
    images: {
        type: [String],
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        default: []
    }]},
    { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 