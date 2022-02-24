const isblocked=(par,res,next)=>{
   
    if(par=true){
return res.status(400).send({msg:"not auth as blocked user"})
    }
    next()
}

module.exports=isblocked