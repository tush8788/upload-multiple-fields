const mongoose=require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost/multipleFile');

const db=mongoose.connection;

db.on('error',()=>{
    console.log("error in connecting DB");
})

db.once('open',()=>{
    console.log("successfully connected to DB");
})

module.exports=db;