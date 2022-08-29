const { add, update, find, finduserinvesments, remove,transactionexist } = require("./services");
const{find:transfind}=require('../payment/services')

//id	customer_id	ammount	commission_rate	transaction_id	nominee_id	
//account_no	agreement_id	referred_by	customer_type



const AddInvesment = (req, res) => {

   let data = req.body;
    if (data.customer_id == undefined || data.ammount == undefined || data.commission_rate == undefined || data.transaction_id == undefined || data.nominee_id == undefined || data.account_no == undefined || data.customer_type == undefined)
        {
            console.log(data)
            res.status(200).json({ status: "failed", message: "invalid data oooo" });
        }
    else {
        transfind(data.transaction_id,(err,result)=>{
          
            if (err)
                res.status(200).json({ status: "failed", message: "internal server error" });
            else if(result.length==0)
            res.status(200).json({ status: "failed", message: "invalid transaction id" });
            else if(parseFloat(result[0].ammount)!=parseFloat(data.ammount))
            res.status(200).json({ status: "failed", message: "invalid transaction ammount" });
            else{
                transactionexist(data.transaction_id,(err,result)=>{
                    if (err)
                res.status(200).json({ status: "failed", message: "internal server error" });
            else if(result.length)
            res.status(200).json({ status: "failed", message: "transaction already used" });
            else{
                add(data, (err, result) => {
                    if (err)
                        res.status(200).json({ status: "failed", message: "internal server error" });
                    else {
                        data.id = result.insertId;
                        res.status(200).json({ status: "success", data, });
                    }
                }); 
            }

                })
            }
        });
    }
}

const UpdateInvestment = (req, res) => {

    data = req.body;
    if (data.customer_id == undefined || data.commission_rate == undefined  || data.nominee_id == undefined || data.account_no == undefined || data.customer_type == undefined || data.id==undefined)
        res.status(200).json({ status: "failed", message: "invalid data" });
    else {
        update(data, (err, result) => {
            if (err)
                res.status(200).json({ status: "failed", message: "internal server error" });
            else if (result.affectedRows) {
                return res.status(200).json({
                    status: "success",
                    message: "data updated"
                });
            }
            else {
                res.status(200).json({ status: "failed", message: "invalid information" });
            }
        });
    }
}

const InvesmentInfo = (req, res) => {

    if(req.params.id==undefined){
        res.status(200).json({status:"failed",
            message:"invalid data"
            }); 
    }
    else{
        find(req.params.id,(err,result)=>{
            if(err){
                return res.status(200).json({status:"failed",
                    message:"internal server error"
                }); 
            }
            else{
                if(result.length==0){
                    return res.status(200).json({status:"failed",
                        message:"No data Found"
                    });  
                }
                result=result[0];
                return res.status(200).json({status:"success",
                    data:result
                });
            }
        });
    }

 }

const UserInvesments = (req, res) => {

    let data=req.body;
    if(data.customer_id==undefined || data.customer_type==undefined){
        res.status(200).json({status:"failed",
            message:"invalid data"
            }); 
    }
    else{
        finduserinvesments(data,(err,result)=>{
            if(err){
                return res.status(200).json({status:"failed",
                    message:"internal server error"
                }); 
            }
            else{
                if(result.length==0){
                    return res.status(200).json({status:"failed",
                        message:"No data Found"
                    });  
                }
                return res.status(200).json({status:"success",
                    data:result
                });
            }
        });
    }
 }

const DeleteInvesment = (req, res) => { 

    if(req.params.id==undefined || isNaN(req.params.id)){
        res.status(200).json({status:"failed",
            message:"invalid data"
            });
    }
    else{
        remove(req.params.id,(err,result)=>{
            if(err)
                    res.status(200).json({ status:"failed",message:"internal server error"});
                    else if(result.affectedRows==0)
                    res.status(200).json({status:"failed", message:"invalid data"});
                    else 
                    res.status(200).json({mstatus:"success",essage:"data deleted"});
        });
    }
}





module.exports = {AddInvesment,UpdateInvestment,InvesmentInfo,UserInvesments,DeleteInvesment}
