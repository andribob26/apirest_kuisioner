const Dosen = require("../models/dosen_model");

exports.addDosen = async (req, res)=>{
    // console.log(req.body)

    var dosen = new Dosen(
            {
                namaDosen: req.body.namaDosen,
                nip: req.body.nip,
                noTelepon: req.body.noTelepon,
                email: req.body.email,
            }
        );
    await dosen.save().then(async (doc)=>{

        console.log(doc)
            const dosenData = {
                namaDosen: doc.namaDosen,
                nip: doc.nip,
                noTelepon: doc.noTelepon,
                email: doc.email,

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
                email: dosen[i].email,
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

exports.updateDosen = async(req, res)=>{
    let dosen = await Dosen.findById(req.params.id)
                const data = {
                    namaDosen: req.body.namaDosen || dosen.namaDosen,
                    nip: req.body.nip || dosen.nip,
                    noTelepon: req.body.noTelepon || dosen.noTelepon,
                    email: req.body.email || dosen.email,
                }
    
    Dosen.findByIdAndUpdate(req.params.id, data, {new: true})
    .then((dosen)=>{
        if(!dosen){
            res.status(404).json({
                status: false,
                message: "Produk tidak di temukan"
            })
        }else{
            res.status(200).json({
                status: true,
                message: "Berhasil update data",
                dosen
            })
        }
    }).catch((err)=>{
        res.json({
            error: err
        })
    })
}

exports.getDosenById = async(req, res)=>{

    await Dosen.findById(req.params.id).then((dosen)=>{
        
        
   
        if(!dosen){
            res.status(404).json({
                status: false,
                message: "Dosen tidak di temukan"
            })
        }else{

            const kuisioner = []

            for (let i = 0; i < dosen.kuisioner.length; i++) {
                kuisioner.push({
                    idMhs: dosen.kuisioner[i].idMhs,
                    namaMhs : dosen.kuisioner[i].namaMhs,
                    idKuisioner: dosen.kuisioner[i].idKuisioner,
                    judulKuisioner: dosen.kuisioner[i].judulKuisioner,
                    hasilKuis: dosen.kuisioner[i].hasilKuis,
                    updatedAt: dosen.kuisioner[i].updatedAt,
                    createdAt: dosen.kuisioner[i].createdAt
                }) 
                
            }

            const dosenData = {
                id: dosen._id,
                namaDosen: dosen.namaDosen,
                nip: dosen.nip,
                noTelepon: dosen.noTelepon,
                email: dosen.email,
                kuisioner: kuisioner,
            }

            // console.log(produk._id)
            res.status(200).json({
                status: true,
                message: "Berhasil memuat data",
                dosenData,
            })
        }
    }).catch((err)=>{
        res.json({
            error: err
        })
    })   
}