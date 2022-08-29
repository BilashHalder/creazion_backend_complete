const {add,update,find,findusertransaction}=require("./services");
//transaction_id credit_to	debit_from	ammount	payment_mode	status
const AddTransaction=(req,res)=>{
let data=req.body;
if(data.transaction_id==undefined || data.credit_to==undefined || data.debit_from==undefined || data.ammount==undefined || data.payment_mode==undefined)
res.status(200).json({status:"failed", message:"invalid data"});
else{
add(data,(err,result)=>{
    if(err){
        return res.status(200).json({status:"failed", message:"internal server error"
        }); 
    }
    else{
        res.status(200).json({status:"success",data});
    }
});
}
}

const UpdateTransaction=(req,res)=>{
    let data=req.body;
    if(data.transaction_id==undefined ||  data.payment_mode==undefined ||data.status==undefined)
    res.status(200).json({status:"failed", message:"invalid data"});
    else{
    update(data,(err,result)=>{
        if(err){
            return res.status(500).json({status:"failed",
                message:"internal server error"
            }); 
        }
        else if(result.affectedRows == 0)
        return res.status(200).json({status:"failed",
            message:"no data found"
        });
        else
            res.status(200).json({status:"success",message:"data updated"});
        
    });
    }
}


const TransactionInfo=(req,res)=>{
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


const userTransactions=(req,res)=>{
    if(req.params.account_no==undefined){
        res.status(200).json({status:"failed",message:"invalid data"}); 
    }
    else{
        findusertransaction(req.params.account_no,(err,result)=>{
            if(err){
                return res.status(200).json({status:"failed", message:"internal server error"
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

module.exports={AddTransaction,UpdateTransaction,TransactionInfo,userTransactions}
