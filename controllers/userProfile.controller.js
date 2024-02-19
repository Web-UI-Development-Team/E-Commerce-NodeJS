const UpdateUser = (req,res)=>{
    const user = User.find((c)=>c.id === (res.params.id))

    if(!user){
        res.status(404).send("the user with given Id was not exist");
        return;
    }
    user.name = req.body.name
    res.send(user);
}

module.exports={
    UpdateUser
 }