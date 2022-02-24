const isAdmin=(req,res,next)=>{
   
    if(req.user.id!=="620ed60dcb77322898661d9f"){
return res.status(400).send({msg:"not auth as admin"})
    }
    next()
}

module.exports=isAdmin