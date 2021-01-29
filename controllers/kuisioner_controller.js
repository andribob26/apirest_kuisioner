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