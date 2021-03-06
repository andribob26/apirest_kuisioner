const {Mahasiswa} = require('../models/mahasiswa_model')
const Dosen = require("../models/dosen_model");
const bcrypt = require("bcrypt")
const salt = 10

exports.addMahasiswa = (req, res)=>{
    let mahasiswa = new Mahasiswa({
        namaMhs: req.body.namaMhs,
        nim: req.body.nim,
        password: req.body.password,
        role: req.body.role

    })
    mahasiswa.save((err, doc)=>{
        if(err){
            return res.json({
                error:err
            })
        }else{
            const mahasiswaData = {
                namaMhs: doc.namaMhs,
                nim: doc.nim,
                password: doc.password,
                role: doc.role
           
            }
            return res.status(200).json({
                success:true,
                message: 'Berhasil di tambahkan',
                mahasiswaData
            })
        }
    })
}

exports.getAllMahasiswa = async(req, res)=>{
    await Mahasiswa.find({}, (err, mahasiswa)=>{
        const mahasiswaData = []
        for(let i = 0; i < mahasiswa.length; i++){
            mahasiswaData.push({
                idMhs: mahasiswa[i]._id,
                namaMhs : mahasiswa[i].namaMhs,
                nim: mahasiswa[i].nim,
                updatedAt: mahasiswa[i].updatedAt,
                createdAt: mahasiswa[i].createdAt
            }) 
        }

        if(err){
            res.status(400).json({
                success: false,
                message: "Gagal memuat data!"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Berhasil memuat data",
                mahasiswaData
            })
        }
    })   
}


exports.loginMhs = (req, res)=>{
    Mahasiswa.findOne({
        'nim': req.body.nim
    }, (err, mahasiswa)=>{
        if(!mahasiswa){
            return res.status(404).json({
                success: false,
                message: 'Username tidak di temukan'
            })
        }else{
            mahasiswa.comparePassword(req.body.password, (err, isMatch) =>{
                console.log(isMatch)
                if(!isMatch){
                    return res.status(400).json({
                        success: false,
                        message: 'User password salah!'
                    })
                }else{
                    const data = {
                        idMhs: mahasiswa._id,
                        namaMhs: mahasiswa.namaMhs,
                        nim: mahasiswa.nim,
                        role: mahasiswa.role,
                        // token: mahasiswa.token
                    }
                    res.status(200).json({
                        success:true,
                        message:'Login berhasil',
                        mahasiswaData: data
                    })
                }
            })
        }
    })
}

// exports.logoutMhs = (req, res) =>{
//     console.log(req.token)
//     Mahasiswa.findByIdAndUpdate(
//         { _id: req.mahasiswa._id }, { token: '' }, {new: true},
//         (err) => {
//         if (err) return res.json({ success: false, err })
//         return res.status(200).send({ success: true, message: "Logout berhasil" });})
// }

exports.getMhsLogin= (req, res) => {
    // console.log(req);
    return res.status(200).json({
        isAuthenticated: true,
        profileData:[
            {
                id: req.mahasiswa._id,
                namaMhs: req.mahasiswa.namaMhs,
                nim: req.mahasiswa.nim, 
            }
        ]

           
    })
}

exports.getMhsById = async(req, res)=>{

    await Mahasiswa.findById(req.params.id).then((mahasiswa)=>{
   
        if(!mahasiswa){
            res.status(404).json({
                status: false,
                message: "Mahasiswa tidak di temukan"
            })
        }else{

            const mahasiswaData = {
                idMhs: mahasiswa._id,
                namaMhs: mahasiswa.namaMhs,
                nim: mahasiswa.nim,
            }

            // console.log(produk._id)
            res.status(200).json({
                status: true,
                message: "Berhasil memuat data",
                mahasiswaData,
            })
        }
    }).catch((err)=>{
        res.json({
            error: err
        })
    })   
}

exports.deleteMahasiswa = async(req, res)=>{
    // console.log(req.params.id)
    await Dosen.find({}, (err, dosen)=>{
    
        
        for (let i = 0; i < dosen.length; i++) {
            
            for (let j = 0; j < dosen[i].kuisioner.length; j++) {
            
             
                // console.log(dosen[i].kuisioner[j]);
                if (req.params.id == dosen[i].kuisioner[j].idMhs) {
                    console.log("jalan")
                    console.log(dosen[i].kuisioner[j].idMhs)
                    Dosen.findByIdAndUpdate(dosen[i]._id , { $pull: { kuisioner: {idMhs:dosen[i].kuisioner[j].idMhs} } },  {new: true}).then(async(doc)=>{
                      ///
                      Mahasiswa.findByIdAndRemove(req.params.id)
                        .then((mahasiswa)=>{
                            if(!mahasiswa){
                                res.status(404).json({
                                    status: false,
                                    message: "Data mahasiswa tidak di temukan"
                                })
                            }else{
                                res.status(200).json({
                                    status: true,
                                    message: "Berhasil hapus data",
                                })
                            }
                        }).catch((err)=>{
                            res.json({
                                error: err
                            })
                        })
                        ////
                     
                    }).catch((err)=>{
                        res.json({
                            error: err
                        })
                    });
                    
                }

                Mahasiswa.findByIdAndRemove(req.params.id)
                        .then((mahasiswa)=>{
                            if(!mahasiswa){
                                res.status(404).json({
                                    status: false,
                                    message: "Data mahasiswa tidak di temukan"
                                })
                            }else{
                                res.status(200).json({
                                    status: true,
                                    message: "Berhasil hapus data",
                                })
                            }
                        }).catch((err)=>{
                            res.json({
                                error: err
                            })
                        })

              
            }
        }

        // console.log(req.params.id)


    })   
}

exports.ubahPassMahasiswa = async(req, res)=>{
    await Mahasiswa.findById(req.params.id).then((mahasiswa)=>{
        console.log(mahasiswa)
        mahasiswa.comparePassword(req.body.password, (err, isMatch) =>{
            // console.log(isMatch)
            if(!isMatch){
                return res.status(400).json({
                    success: false,
                    message: 'User password salah!'
                })
            }else{
                bcrypt.genSalt(salt, function(err, salt) {
                    bcrypt.hash(req.body.passwordBaru, salt, function(err, hash) {
                        req.body.passwordBaru = hash;
                        
        
                        // let data = {_id:req.params.id}
                        const data = {
                            namaMhs: req.body.namaMhs || mahasiswa.namaMhs,
                            nim: req.body.nim || mahasiswa.nim,
                            password: hash || mahasiswa.password,
                            role: req.body.role || mahasiswa.role,
                        }
                        // console.log(data)
                        // Mahasiswa.update(query, mahasiswa, function(err){
        
                        // })
                        Mahasiswa.findByIdAndUpdate(req.params.id, data, {new: true})
                        .then((mahasiswa)=>{
                            if(!mahasiswa){
                                res.status(404).json({
                                    status: false,
                                    message: "Produk tidak di temukan"
                                })
                            }else{
                                res.status(200).json({
                                    status: true,
                                    message: "Berhasil ganti password",
                                    mahasiswa
                                })
                            }
                        }).catch((err)=>{
                            res.json({
                                error: err
                            })
                        })
        
                    })
                })
            }
        })
        
    })
    // console.log(req.params.id)
    
    // bcrypt.genSalt(salt, function(err, salt){
        
        // if(err){
        //     return next(err)
        // }
        // bcrypt.hash("admin", salt ,function(err, hast){
        //     // if(err){
        //     //     console.log("error")
        //     // }
        //     console.log(hast);
        //     // admin.password = hast
        //     // next()
        // })
    
// })
}