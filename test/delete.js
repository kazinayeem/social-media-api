const profileModel = require("../models/profile")



const deletealluser = () => {
    profileModel.deleteMany((err) => {
        if(err){
            console.log(err);
        }else{
            console.log("success");
        }
    })
}

module.exports = deletealluser