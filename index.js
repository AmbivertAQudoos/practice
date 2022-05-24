var express = require('express');
const app = express();
const middleware=require('./middleware/mid')
const Con=require('./Controller/routing');
const bodyparser=require('body-parser');
const file=require('express-fileupload');
const mongoose=require('mongoose');
const User = require('./model/User');
mongoose.connect("mongodb://localhost/ead")
app.use(file());
app.use(express.static('public'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs');

app.get('/',Con.home);

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.get('/signin',(req,res)=>{
    res.render('signin')
})

app.get("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    const delete1 =await User.findByIdAndDelete(id);
    res.redirect("/");
})

app.get("/data/:id",async(req,res)=>{
    const {id} = req.params;
    const data = await User.findById(id);
    res.render("update",{data:data});
})

app.post("/update", async(req,res)=>{
    const {id,Username,Password} = req.body;
    const img = req.files.img;
    console.log(id);
    const data = await User.updateOne({_id:id},
    
        {$set:{Username:Username,Password:Password,img:img.name}}
    );
    img.mv(`./public/img/`+img.name,function(err){
        if(err)
            console.log('err')
        else
            console.log('file upload')
    })
    res.redirect("/");
})

app.post('/save',async (req,res)=>{
    const {Username,Password}=req.body;
    const img=req.files.img;
    await User.create({Username,Password,img:img.name});
    img.mv(`./public/img/`+img.name,function(err){
        if(err)
            console.log('err')
        else
            console.log('file upload')
    })
    res.redirect('/');
})

app.post('/save/data',middleware.midsigin,Con.home)

app.listen(4000,function(){
    console.log("server is listening at 4000");
});
