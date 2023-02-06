const UserDB=require('../models/user');
module.exports.home=async(req,res)=>{
    let users=await UserDB.find({});

    return res.render('home',{
        title:"Home",
        users:users
    });
}

module.exports.uploadFile=async(req,res)=>{
    try{
        UserDB.uploadImages(req,res,async function(err){
            if(err)
            {
                console.log("error in controller :: ",err);
            }

            let user=await UserDB.findOne({email:req.body.email});
            if(!user){
                user=await UserDB.create({email:req.body.email});
            }

            // console.log(req.body);
            if(req.files ){
                // console.log("multiple " ,req.files)
                if(req.files.avatar && req.files.avatar.length>0){
                    user.avatar=UserDB.IMAGE_PATH+"/"+req.files.avatar[0].filename;
                    // user.save();
                }

                if(req.files.photos && req.files.photos.length>0){
                    // console.l
                    for(let img of req.files.photos){
                        user.photos.push(UserDB.IMAGE_PATH+"/"+img.filename);
                    }

                }
                user.save();
            }

            return res.redirect('/');

            // if(req.file){
            // }
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}