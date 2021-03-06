const {Admin} = require("../models/admin_model")
let authAdmin =(req, res, next)=>{
    console.log(req.cookies);
    let token = req.cookies.authTokenAdmin;
    Admin.findByToken(token,(err,admin)=>{
        if(err) throw err;
        if(!admin) {
            return res.json({
                isAuth: false,
                error: true
            })
        }else{
        req.token= token;
        req.admin=admin;
        next();
        }

    })
}

module.exports = {authAdmin}