// const express = require("express");
// const model =  require("../model/models");

// const router = express.Router();

// router.get("/" ,async (request,response) =>{
//     try{
//         const cafe = await model.find(); // we have to give the const name(model) as we can see in the reference video. 
//         // response.send(call);
//         response.render("home",{
//            title : "The home page",
//         //    message : "Welcome ! Hope you enjoy the coffee!"
//            data: cafe
        
//         });
 

//     }
//     catch(error){
//         console.log(" The error occured while getting a data");
//         response.status(500).send("Internal Server Error");
//     }
//     // response.send("Hey this is your first web App , hope you are enjoying !")
//     });

// router.get("/add",(request,response)=>{
//         response.render("addcafe",{
//              title: "Add New cafe"
//         });
//    });
// router.post("/add" , async(request,response) =>{
//     try{
//         console.log("name : " + request.body.name);
//         const cafe = new model({
            
//             name : request.body.name,
//             phoneNumber : request.body.phoneNumber, // case senstive , You have to provide a valid number
//             Review : 0,
//             UpdateReview: 0 


//         });
//         await cafe.save();
//         console.log(" The new cafe added ,hurray!!!" + cafe);
//         // request.send(cafe); // this will helps you to pull the data which is written in JSON to the database (mongo DB, MYSql)
//         response.redirect("/")
//         // response.json(" New cafe added");
//         // response.send(cafe);
//     }

//     catch{
//         response.status(401);
//          console.log("Error occured , OOPS!! No cafe was added");
//     }
// });


// router.get("/rate/:id", async(request,response)=>{
//     const id = request.params.id;
//     // console.log("id = " + id );
//     try{
//         const cafe = await model.findById(id);
//         response.render("ratecafe",{
//             title: " rate cafe",
//             data: cafe
//         });

//     } 
//     catch(error){
//         response.status(401);
//         console.log(" The error occured while getting the data");
//         response.redirect("/");
//     }
// });

// // the below route helps you to add the rating in the table count:

// router.post("/rate/:id", async(request,response)=>{
//     const id = request.params.id;
//     let rating = parseInt(request.body.rating);
//     try{
//         // const cafe = await model.findById(id);
//         // const ratingSum = parseInt(cafe.Review) + rating;
//         // const ratingCount = parseInt(cafe.UpdateReview)+1;
//         // await model.findByIdAndUpdate(id,{
//         //     UpdateReview : ratingCount,
//         //     Review : ratingSum

//         const cafe = await model.findById(id);
//         // if (!cafe) {
//         //     response.status(404).send("Cafe not found");
//         //     return;
//         // }

//         const ratingSum = cafe.Review + rating;
//         const ratingCount = cafe.UpdateReview + 1;

//         await model.findByIdAndUpdate(id, {
//             UpdateReview: ratingCount,
//             Review: ratingSum
//         });

//         response.redirect("/");

//     }
//     catch(error){
//         response.status(401);
//         console.log("Error while rating");
//         response.redirect("/rate/:"+id);
//     }
    
// });

// // router.post("/rate/:id", async(request,response) =>{
// //     const id = request.params.id;
// //     const rating = parseInt(request.body.rating);
// //     try{
// //     const cafe = await model.findById(id);
// //     // const newsum = parseInt(cafe.Review + rating);
// //     // const updatedsum = parseInt(cafe.UpdateReview + 1);
// //     const newSum = parseInt(cafe.Review + rating);
// //     const newCount = parseInt(cafe.UpdateReview + 1);

// //     await model.findByIdAndUpdate(id,{
// //     // Review: review + rating,
// //     // UpdateReview: UpdateReview + 1 
// //     Review : newSum,
// //     UpdateReview: newCount

// //     })
// //     response.redirect("/") ;
// //     }
// //     catch (err) {
// //     console.error("Error while rating:");
// //     // response.status(401);
// //     // response.redirect("/rate/" + id);
// // }
// // })


// module.exports = router;



const express = require("express");
const model = require("../model/models");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const cafes = await model.find();
        response.render("home", {
            title: "The home page",
            data: cafes
        });
    } catch (error) {
        console.log("The error occurred while getting data", error);
        response.status(500).send("Internal Server Error");
    }
});

router.get("/add", (request, response) => {
    response.render("addcafe", {
        title: "Add New Cafe"
    });
});

router.post("/add", async (request, response) => {
    try {
        const cafe = new model({
            name: request.body.name,
            phoneNumber: request.body.phoneNumber,
            Review: 0,
            UpdateReview: 0
        });
        await cafe.save();
        request.session.message = {
            type: "success",
            info: "The new cafe added successfully!"
            };
        response.redirect("/");
    } catch (error) {
        response.status(401).send("Error occurred, OOPS!! No cafe was added");
        console.log("Error occurred, OOPS!! No cafe was added", error);
    }
});




router.get("/rate/:id", async (request, response) => {
    const id = request.params.id;
    try {
        const cafe = await model.findById(id);
        response.render("ratecafe", {
            title: "Rate Cafe",
            data: cafe
        });
    } catch (error) {
        console.log("The error occurred while getting the data", error);
        response.status(401).redirect("/");
    }
});

router.post("/rate/:id", async (request, response) => {
    const id = request.params.id;
    const rating = parseInt(request.body.rating);

    try {
        console.log(`Rating cafe with ID: ${id} with rating: ${rating}`);
        const cafe = await model.findById(id);

        if (!cafe) {
            console.log("Cafe not found");
            response.status(404).send("Cafe not found");
            return;
        }

        const ratingSum = cafe.Review + rating;
        const ratingCount = cafe.UpdateReview + 1;
        
        
        // console.log(`Updating cafe. New Review Sum: ${ratingSum}, New UpdateReview: ${ratingCount}`);
        request.session.message = {
            type: "success",
            info: "Rating added successfully!"
            };
        await model.findByIdAndUpdate(id, {
            Review: ratingSum,
            UpdateReview: ratingCount
        });

        console.log("Cafe successfully updated");
        response.redirect("/");
    } catch (error) {
        console.log("Error while rating", error);
        response.status(401).redirect("/rate/" + id);
    }
});

module.exports = router;

