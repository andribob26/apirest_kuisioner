const Dosen = require("../models/dosen_model");

exports.addDosen = async (req, res)=>{

    var dosen = new Dosen(
            {
                namaDosen: req.body.namaDosen,
                nip: req.body.nip,
                noTelepon: req.body.nomorTelepon,
                alamat: req.body.alamat,
            }
        );
    await dosen.save().then(async (doc)=>{

        console.log(doc)
            const dosenData = {
                namaDosen: doc.namaDosen,
                nip: doc.nip,
                noTelepon: doc.noTelepon,
                alamat: doc.alamat,

            }
            res.status(200).json({
                success: true,
                message: "Dosen berhasil di tambahkan",
                dosenData

            })

    }).catch((err)=>{
        res.json({
            error: err
        })
    })
}

exports.getAllDosen = async(req, res)=>{
    await Dosen.find({}, (err, dosen)=>{
        const dosenData = []
        for(let i = 0; i < dosen.length; i++){
            dosenData.push({
                id: dosen[i]._id,
                namaDosen : dosen[i].namaDosen,
                nip: dosen[i].nip,
                noTelepon: dosen[i].noTelepon,
                alamat: dosen[i].alamat,
                updatedAt: dosen[i].updatedAt,
                createdAt: dosen[i].createdAt
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
                dosenData
            })
        }
    })   
}

exports.deleteDosen = async(req, res)=>{
    Dosen.findByIdAndRemove(req.params.id)
    .then((dosen)=>{
        if(!dosen){
            res.status(404).json({
                status: false,
                message: "Data dosen tidak di temukan"
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
