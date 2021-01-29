const Kuisioner = require("../models/kuisioner_model")

exports.getAllKuisioner = async(req, res)=>{
    await Kuisioner.find({}, (err, kuisioner)=>{
        const kuisionerData = []
        for(let i = 0; i < kuisioner.length; i++){
            kuisionerData.push({
                id: kuisioner[i]._id,
                judulKuisioner: kuisioner[i].judulKuisioner,
                pertanyaan: kuisioner[i].pertanyaan,
                updatedAt: kuisioner[i].updatedAt,
                createdAt: kuisioner[i].createdAt
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
                kuisionerData
            })
        }
    })   
}

exports.getKuisionerById = async(req, res)=>{
    console.log(req.params.id) 
    await Kuisioner.findById(req.params.id).then((kuisioner)=>{
        console.log(kuisioner);
        if(!kuisioner){
            res.status(404).json({
                status: false,
                message: "Produk tidak di temukan"
            })
        }else{

            const kuisionerData = {
                id: kuisioner._id,
                judulKuisioner: kuisioner.judulKuisioner,
                pertanyaan: kuisioner.pertanyaan,
            }

            // console.log(produk._id)
            res.status(200).json({
                status: true,
                message: "Berhasil memuat data",
                kuisionerData,
            })
        }
    }).catch((err)=>{
        res.json({
            error: err
        })
    })   
}