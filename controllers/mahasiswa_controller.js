const {Mahasiswa} = require('../models/mahasiswa_model')

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
                id: mahasiswa[i]._id,
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
                    mahasiswa.generateToken((err, mahasiswa)=>{
                        if(err){
                            return res.status(400).send({err})
                        }else{
                            const data = {
                                idMhs: mahasiswa._id,
                                namaMhs: mahasiswa.namaMhs,
                                nim: mahasiswa.nim,
                                role: mahasiswa.role,
                                token: mahasiswa.token
                            }
                            res.cookie('authToken', mahasiswa.token).status(200).json({
                                success:true,
                                message:'Login berhasil',
                                mahasiswaData: data
                            })
                        }
                    })
                }
            })
        }
    })
}

exports.logoutMhs = (req, res) =>{
    console.log(req.token)
    Mahasiswa.findByIdAndUpdate(
        { _id: req.mahasiswa._id }, { token: '' },
        (err) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({ success: true, message: "Logout berhasil" });})
}

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