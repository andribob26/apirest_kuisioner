const mongoose = require("mongoose")
const timestamps  = require("mongoose-timestamp")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10
const secret = require("../config/config").secret

MahasiswaSchema = mongoose.Schema({

    namaMhs:{
        type: String
    },
    nim:{
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

MahasiswaSchema.plugin(timestamps)


MahasiswaSchema.pre('save', function (next){
    var mahasiswa = this
    if (mahasiswa.isModified('password')){
        bcrypt.genSalt(salt, function(err, salt){
            if(err){
                return next(err)
            }
            bcrypt.hash(mahasiswa.password, salt, function(err, hast){
                if(err){
                    return next(err)
                }
                mahasiswa.password = hast
                next()
            })
        })
    }else{
        next()
    }
})


MahasiswaSchema.methods.comparePassword = function(candidatePass, callBack){
    bcrypt.compare(candidatePass, this.password, function (err, isMatch) {
        if(err){
            return callBack(err)
        }        
        callBack(null, isMatch)
    })
}


MahasiswaSchema.methods.generateToken = function (callBack) {
    var mahasiswa = this;
    var token = jwt.sign(mahasiswa._id.toHexString(), secret)
    mahasiswa.token = token
    mahasiswa.save(function (err, mahasiswa) {
        if(err){
            return callBack(err)
        }
        callBack(null, mahasiswa)
    })
}


MahasiswaSchema.statics.findByToken = function(token, callBack){
    var mahasiswa = this
    jwt.verify(token, secret, function(err, decode){
        mahasiswa.findOne({
            '_id': decode,
            'token': token
        },function(err, mahasiswa){
            if(err){
                return callBack(err)
            }
            callBack(null, mahasiswa)
            
        })
    })
}


const Mahasiswa = mongoose.model('Mahasiswa', MahasiswaSchema)
module.exports = {Mahasiswa}