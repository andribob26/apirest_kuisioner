const Pertanyaan = require("../models/pertanyaan_model");

exports.addPertanyaan = async (req, res)=>{

    var pertanyaan = new Pertanyaan(
            {
                pertanyaan: req.body.pertanyaan,
                
            }
        );
    await pertanyaan.save().then(async (doc)=>{

        console.log(doc)
            const pertanyaanData = {
                pertanyaan: doc.pertanyaan,
              

            }
            res.status(200).json({
                success: true,
                message: "Dosen berhasil di tambahkan",
                pertanyaanData

            })

    }).catch((err)=>{
        res.json({
            error: err
        })
    })
}

exports.getAllPertanyaan = async(req, res)=>{
    await Pertanyaan.find({}, (err, pertanyaan)=>{
        const pertanyaanData = []
        for(let i = 0; i < pertanyaan.length; i++){
            pertanyaanData.push({
                id: pertanyaan[i]._id,
                pertanyaan : pertanyaan[i].pertanyaan,
                updatedAt: pertanyaan[i].updatedAt,
                createdAt: pertanyaan[i].createdAt
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
                pertanyaanData
            })
        }
    })   
}