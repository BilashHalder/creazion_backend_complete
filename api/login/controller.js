
const {find:associateFind}=require('../associate/services');
const {find:customerFind}=require('../customer/services');

const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRound=10;


const LoginCustomer=(req,res)=>{
let data=req.body;
if(data.email_phone==undefined || data.pass==undefined)
        res.status(200).json({status:"failed", message:"invalid data" }); 
    else{
        let temp={email:data.email_phone,phone_no:data.email_phone}
        customerFind(temp,(err,result)=>{
            if(err)
            res.status(200).json({ status:"failed",message:"internal server error" }); 
            else if(result.length==0)
            res.status(200).json({status:"failed", message:"invalid credentials" }); 
            else if(bcrypt.compareSync(req.body.pass, result[0].pass))
            res.status(200).json({status:"failed", message:"invalid credentials" }); 
            else {
                let user=result[0];
                user.pass=undefined;
                user.created_at=undefined;
                user.image=undefined;
                user.status=undefined
            var token = jwt.sign({
                "id": 1,
                "full_name": "Test user2",
                "phone_no": "12789645560",
                "email": "test@test.com2"
              }, 'strongpass');

                res.status(200).json(token);
            }
        });
    }

}
const LoginAdmin=(req,res)=>{
res.json("admin")
}
const LoginAssociate=(req,res)=>{
    res.json("associate")
}




module.exports = {LoginCustomer,LoginAdmin,LoginAssociate }