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
