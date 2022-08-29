const {add,update,findnominees,find,remove}=require("./services");

//	id	customer_id	name	dob	customer_type  nominee

/********************************
 ********************************
 ********************************/

 //customer_id name date_of_birth
 const AddNominee=(req,res)=>{
    data=req.body;
    if(data.customer_id==undefined || data.name==undefined || data.dob==undefined || data.customer_type==undefined)
    res.status(200).json({status:"failed",message:"invalid data" });
    else{
        findnominees(data,(err,result)=>{
            if(err){
                return res.status(200).json({status:"failed",
                    message:"internal server error"
                }); 
            }
            else if(result.length==5){
                
                return res.status(200).json({status:"failed",
                    message:"limit reached"
                });
            }
            else{
                add(data,(err,result)=>{
                    if(err)
                        res.status(200).json({status:"failed", message:"internal server error" });
                    else{
                        data.id=result.insertId;
                        res.status(200).json({status:"success",data,});
                    }  
                }); 
            }
        }); 
    }
}

const UpdateNominee = (req, res) => {
    data=req.body;
    if (data.customer_id == undefined || data.name == undefined || data.dob == undefined || data.customer_type==undefined|| data.id==undefined)
        res.status(200).json({status:"failed", message: "invalid data" });
    else {
        update(data, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });
            else if (result.affectedRows) {
                return res.status(200).json({status:"success",
                    message: "data updated"
                });
            }
            else {
                res.status(200).json({status:"failed", message: "invalid information" });
            }
        });
    }

}

const FindNominees=(req,res)=>{
    let data=req.body;
    if(data.customer_id==undefined || data.customer_type==undefined){
        res.status(200).json({status:"failed",
            message:"invalid data"
            }); 
    }
    else{
        findnominees(data,(err,result)=>{
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

const NomineeInfo=(req,res)=>{
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


const DeleteNominee=(req,res)=>{
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

module.exports={AddNominee,UpdateNominee,FindNominees,DeleteNominee,NomineeInfo}
