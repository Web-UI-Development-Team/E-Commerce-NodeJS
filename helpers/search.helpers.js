const getCategoryName = async(req,res)=>{
    const item = req.params.name;
    const value = req.params.value;
    if(!item || !value){
        resizeBy.status(404).send("The Product not found");
        return;
    }
    console.log(item);
    console.log(value);
}

module.exports = getCategoryName;