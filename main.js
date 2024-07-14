const express =  require("express");
const dotenv = require("dotenv").config(); 
const db = require("./config/dbConnectionConfig");
const bodyParser = require("body-parser");
const session = require("express-session");
const app =  express();
const PORT = process.env.PORT || 4000;


//middleware
app.use(
    session({
        secret : "my secret key",
        saveUninitialized : true,
        resave: false,
    })
);
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/",require("./routes/routes"));
app.set("view engine","ejs"); // embedded java script helps in connecting back and front end

//basic get API 
// this we will be using in router instead of in API 
// app.get("/" ,(request,response) =>{
// response.send("Hey this is your first web App , hope you are enjoying !")
// })


// app.get("/durga" ,(request,response) =>{
//     response.send("welcome to the test application!")
//     })

//INtilslise DB connection

db();

app.listen(PORT,()=>{
console.log(" The first web app lauched in the port " + PORT);
})




