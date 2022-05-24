const User=require('../model/User')
const midsigin=async (req,res,next)=>{
    const {Username,Password}=req.body;
    const data=await User.find({Username:Username,Password:Password})
    if(Object.keys(data).length==0)
    {
        return res.redirect('/signin')
    }
    next();
}
module.exports={midsigin};