const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const IMAGE_PATH=path.join('/upload/img');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String
    },
    photos:[{
        type:String
    }]
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',IMAGE_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="image/jpeg"||file.mimetype==="image/jpg"||file.mimetype==="image/png"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}
// static fun
userSchema.statics.uploadImages=multer({
    storage:storage,
    limits:{
        fileSize:1000000 //1mb
    },
    fileFilter:fileFilter
}).fields([{ name: 'avatar', maxCount: 1 }, { name: 'photos', maxCount: 8 }])

userSchema.statics.IMAGE_PATH=IMAGE_PATH;

const User=mongoose.model("User",userSchema);

module.exports=User;