const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10
const secret = require("../config/config").secret

AdminSchema = mongoose.Schema({

    namaAdmin:{
        type: String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type: String
    },
    token:{
        type: String
    }
    

})

AdminSchema.plugin(timestamps)


AdminSchema.pre('save', function (next){
    var admin = this
    if (admin.isModified('password')){
        bcrypt.genSalt(salt, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(admin.password, salt, function(err, hast){
                if(err){
                    return next(err)
                }
                admin.password = hast
                next()
            })
        })
    }else{
        next()
    }
})


AdminSchema.methods.comparePassword = function(candidatePass, callBack){
    bcrypt.compare(candidatePass, this.password, function (err, isMatch) {
        if(err){
            return callBack(err)
        }        
        callBack(null, isMatch)
    })
}


AdminSchema.methods.generateToken = function (callBack) {
    var admin = this;
    var token = jwt.sign(admin._id.toHexString(), secret)
    admin.token = token
    admin.save(function (err, admin) {
        if(err){
            return callBack(err)
        }
        callBack(null, admin)
    })
}


AdminSchema.statics.findByToken = function(token, callBack){
    var admin = this
    jwt.verify(token, secret, function(err, decode){
        admin.findOne({
            '_id': decode,
            'token': token
        },function(err, admin){
            if(err){
                return callBack(err)
            }
            callBack(null, admin)
            
        })
    })
}


const Admin = mongoose.model('Admin', AdminSchema)
module.exports = {Admin}