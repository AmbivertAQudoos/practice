const User=require('../model/User')
const home=async (req,res)=>{
    const obj=await User.find()
    res.render('home',{obj});
}
module.exports={home};