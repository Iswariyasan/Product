var userDetails = require('../models/registration');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.userSignUP = async function (req, res, next) {
await userDetails.find({email : req.body.email}).then(async (userInfo) =>{
    if(userInfo.length > 0){
        return res.status(400).json({
        error: "Email already exists"
        })
    } else{
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(400).json({
                error: err
                })
            } else{
                await userDetails.create({            
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hash,
                    createdAt: Date.now()
                }).then(data => {
                    res.status(200).json({
                        message: "User saved successfully",
                    });
                });
            }
        });
    }
});
}

exports.login = async function (req, res, next) {
    await userDetails.findOne({email : req.body.email}).then((data) =>{
        console.log(data);
    if(data){
        bcrypt.compare(
            req.body.password, data.password,
            (err, bcryptRes) => { 
            if (err) {
                return res.status(401).json({
                message: 'password doesn\'t match',
                error: err.message,
                status: 401
                });
            }else{
            if(bcryptRes == true){
                var token = jwt.sign({ email: req.body.email}, 'SecretKey');
                res.status(200).json({
                    message: "Login successfull",
                    token: token,
                    userData: data
                });
            } else{                   
                return res.status(401).json({
                    message: 'password doesn\'t match',
                    status: 401
                });
            }
            }
        })
    } else{        
        return res.status(401).json({
            message: 'Invalid Email',
            status: 401
          });
    }
})
}