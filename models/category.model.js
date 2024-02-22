const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema( 
  {
    nameCategory: { 
      type: String,
      required: true,
      unique: [true, "duplicated category"], 
    } 
  }, 
  { timestamps: true } // will create 2 fields createdat, updated at 
); 
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel; 