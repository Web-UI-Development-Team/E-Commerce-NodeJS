const User=require('../models/user.model')
const Product=require('../models/product.model')


const updateService=async(email, cart)=>{
    try{
        const user= await User.updateOne(
            { email: email },
            { shoppingCart: cart }
        );

    }
    catch(e){
        console.log("error : ",e);
    }
}
module.exports=updateService