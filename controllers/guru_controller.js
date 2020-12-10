const Guru = require("../models/guru_model");

exports.addGuru = async (req, res)=>{

    var guru = new Guru(
            {
                namaGuru: req.body.namaGuru,
                nip: req.body.nip,
                noTelepon: req.body.nomorTelepon,
                alamat: req.body.alamat,
            }
        );
    await guru.save().then(async (doc)=>{

            const guruData = {
                namaGuru: doc.namaGuru,
                nip: doc.nip,
                noTelepon: doc.noTelepon,
                alamat: doc.alamat,

            }
            res.status(200).json({
                success: true,
                message: "Data guru berhasil di tambahkan",
                guruData

            })

    }).catch((err)=>{
        res.json({
            error: err
        })
    })
}

exports.getAllGuru = async(req, res)=>{
    await Guru.find({}, (err, guru)=>{
        const guruData = []
        for(let i = 0; i < guru.length; i++){
            guruData.push({
                id: guru[i]._id,
                namaGuru : guru[i].namaGuru,
                nip: guru[i].nip,
                noTelepon: guru[i].noTelepon,
                alamat: guru[i].alamat,
                updatedAt: guru[i].updatedAt,
                createdAt: guru[i].createdAt
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
                guruData
            })
        }
    })   
}