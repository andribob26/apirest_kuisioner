const {Admin} = require('../models/admin_model')

exports.addAdmin = (req, res)=>{
    let admin = new Admin({
        namaAdmin: req.body.namaAdmin,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role

    })
    admin.save((err, doc)=>{
        if(err){
            return res.json({
                error:err
            })
        }else{
            const adminData = {
                namaAdmin: doc.namaAdmin,
                username: doc.username,
                password: doc.password,
                role: doc.role
           
            }
            return res.status(200).json({
                success:true,
                message: 'Berhasil di tambahkan',
                adminData
            })
        }
    })
}