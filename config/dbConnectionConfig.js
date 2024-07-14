// // const { MongoDriverError } = require("mongodb");
// const mongoose = require("mongoose");
// const db = async() =>{
//     try{
//         const connect = await mongoose.connect(process.env.DATABASE_CONNECTION,{
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//         });
//         console.log("DataBase Connected",connect.connection.host,connect.connection.name);
//     }
//     catch (error){
//         console.log(" Error Occured and failed to connect...");
//         process.exit(1);

//     }
// }


// module.exports = db;



const mongoose = require("mongoose");

const db = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_CONNECTION);
        console.log("DataBase Connected", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log("Error Occurred and failed to connect...");
        process.exit(1);
    }
};

module.exports = db;
