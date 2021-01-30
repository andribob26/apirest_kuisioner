const {Mahasiswa} = require("../models/mahasiswa_model")
let authMhs =(req, res, next)=>{
    let token = req.cookies.authToken;
    Mahasiswa.findByToken(token,(err,mahasiswa)=>{
        if(err) throw err;
        if(!mahasiswa) {
            return res.json({
                isAuth: false,
                error: true
            })
        }else{
        req.token= token;
        req.mahasiswa=mahasiswa;
        next();
        }

    })
}

module.exports = {authMhs}