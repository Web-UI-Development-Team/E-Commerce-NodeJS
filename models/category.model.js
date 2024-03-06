const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema( 
  {
    nameCategory: { 
      type: String,
      required: true,
      unique: [true, "duplicated category"], 
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  }, 
  { timestamps: true }
); 
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel; 