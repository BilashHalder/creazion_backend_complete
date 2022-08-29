const {add,update,find,remove,verify}=require("./services");
const{update:invesmentupdate,find:invesmentfind}=require('../invesment/services');
const{update:associateupdate,findbyid:associatefind}=require('../associate/services');
const{InvesmentAgreement,AssociateAgreement}=require('../../services/agreement');

//id	printed_on	upload_on	file_url	status 

//invesment id also required. if its invesment 

//associate id if ite associate

/**
 * 
 add :
 type:1 associate 2 customer
 id :associate id/invesment id

 */


const AddInvesmentAgreement=(req,res)=>{
    let data =req.body;
    if(data.invesment_id==undefined){
        res.status(200).json({ status:"failed",message: "invalid data" });
    }
    else{
        invesmentfind(data.invesment_id,(err,result)=>{
            if(err)
            res.status(200).json({status:"failed", message: "internal server error" });
            else if(result.length==0)
                res.status(200).json({status:"failed", message: "invalid invesment information" }); 
            else if(result[0].agreement_id)
                    res.json({status:"failed", message: "already agreement genarated" });
            else{
                let agrname=Date.now()+"invesment"+""+data.invesment_id;
                InvesmentAgreement(agrname);
                let newdata=result[0]
               
                //data to add agreement table
                let adddata={file_url:agrname,status:0}
                add(adddata,(err,result)=>{
                    if(err)
                    res.status(200).json({status:"failed", message: "internal server error" });
                    else{
                         newdata.agreement_id=result.insertId;
                         invesmentupdate(newdata,(err,result)=>{
                            if(err)
                            res.status(200).json({status:"failed", message: "internal server error" });
                            else{
                                let temp={file_url:agrname,agreement_id:newdata.agreement_id}
                                res.status(200).json({status:"success",data:temp}  );  
                            }
                         })
                    }
                });
            }
            
        })
    }
    // InvesmentAgreement(data);
    // res.send("ok");

}

//associate_id is required 


const AddAssociateAgreement=(req,res)=>{
    let data =req.body;
    if(data.associate_id==undefined){
        res.status(200).json({ status:"failed",message: "invalid data" });
    }
    else{
        associatefind(data.associate_id,(err,result)=>{
            if(err)
            res.status(200).json({status:"failed", message: "internal server error " });
            else if(result.length==0)
                res.status(200).json({status:"failed", message: "invalid associate information" }); 
            else if(result[0].agreement_id){
                res.json({status:"failed", message: "already agreement genarated" });   
            }
            else{
                let agrname=Date.now()+"associate"+""+data.associate_id;
                AssociateAgreement(agrname);
                let newdata=result[0];
                let adddata={file_url:agrname,status:0}
                add(adddata,(err,result)=>{
                    if(err)
                    res.status(200).json({status:"failed", message: "internal server error" });
                    else{
                        newdata.agreement_id=result.insertId;
                        associateupdate(newdata,(err,result)=>{
                            if(err)
                            res.status(200).json({status:"failed", message: "internal server error" });
                            else{
                                let temp={file_url:agrname,agreement_id:newdata.agreement_id}
                                res.status(200).json({status:"success",data:temp}  );  
                            }
                         })
                    }
                })
                
            }
        })
    }

}


//agreement copy upload update unlink the generated file -> agrement table file_url,status,upload on
const UploadAssociateAgreement=(req,res)=>{
    let data=req.body;
    if(data.associate_id==undefined || isNaN(data.associate_id))
        res.status(200).json({status:"failed", message:"invalid data" });
    else if(req.files==undefined)
        res.status(200).json({status:"failed", message:"no valid document" });
    else if(req.files.agreement==undefined)
        res.status(200).json({status:"failed", message:"please send valid document" });
    else{
        associatefind(data.associate_id,(err,result)=>{
            if(err)
            res.status(200).json({status:"failed", message:"internal server error" });
            else if(result.length==0)
            res.status(200).json({status:"failed", message:"invalid information" });
            else if(result[0].agreement_id==null)
            res.status(200).json({status:"failed", message:"please generate agreement first" });
            else{
                let agrid=result[0].agreement_id;
            find(result[0].agreement_id,(err,result)=>{
                if(err)
                res.status(200).json({status:"failed", message:"internal server error" });
                else {
                    agreementfile = req.files.agreement;
                    originalname= agreementfile.name;
                    fileExt=originalname.split('.').at(-1);
                    newName=Date.now()+''+'associate'+data.associate_id+'.'+fileExt;
                  //  console.log(newName);
                    //uploadPath = __dirname+'../../../' + '/documents/images/admin/' + newName;
                    let uploadPath=__dirname+'../../../documents/upload/'+newName;
                    agreementfile.mv(uploadPath, function(err) {
                        if(err)
                        res.status(200).json({status:"failed", message:"internal server error"});
                        else
                        {
                            let temp={id:agrid,file_url:newName}

                            update(temp,(err,result)=>{
                                if(err)
                                res.status(200).json({status:"failed", message:"internal server error"});
                                else if(result.affectedRows)
                                res.status(200).json({status:"success", message:"agreement uploaded" });
                                else 
                                res.status(200).json({status:"failed", message:"internal server error"});
                            });
                           
                        }
                    });
                }
                
            })
                
            }
            
        });
    }
    
}


const UploadInvesmentAgreement=(req,res)=>{
    let data=req.body;
    if(data.invesment_id==undefined || isNaN(data.invesment_id))
        res.status(200).json({status:"failed", message:"invalid data" });
    else if(req.files==undefined)
        res.status(200).json({status:"failed", message:"no valid document" });
    else if(req.files.agreement==undefined)
        res.status(200).json({status:"failed", message:"please send valid document" });
    else{
        invesmentfind(data.invesment_id,(err,result)=>{
            if(err)
            res.status(200).json({status:"failed", message:"internal server error" });
            else if(result.length==0)
            res.status(200).json({status:"failed", message:"invalid information" });
            else if(result[0].agreement_id==null)
            res.status(200).json({status:"failed", message:"please generate agreement first" });
            else{
                let agrid=result[0].agreement_id;
            find(result[0].agreement_id,(err,result)=>{
                if(err)
                res.status(200).json({status:"failed", message:"internal server error" });
                else {
                    agreementfile = req.files.agreement;
                    originalname= agreementfile.name;
                    fileExt=originalname.split('.').at(-1);
                    newName=Date.now()+''+'invesment'+data.invesment_id+'.'+fileExt;
                  //  console.log(newName);
                    //uploadPath = __dirname+'../../../' + '/documents/images/admin/' + newName;
                    let uploadPath=__dirname+'../../../documents/upload/'+newName;
                    agreementfile.mv(uploadPath, function(err) {
                        if(err)
                        res.status(200).json({status:"failed", message:"internal server error"});
                        else
                        {
                            let temp={id:agrid,file_url:newName}
                            update(temp,(err,result)=>{
                                if(err)
                                res.status(200).json({status:"failed", message:"internal server error"});
                                else if(result.affectedRows)
                                res.status(200).json({status:"success", message:"agreement uploaded" });
                                else 
                                res.status(200).json({status:"failed", message:"internal server error"});
                            });
                           
                        }
                    });
                }
                
            })
                
            }
            
        });
    }
    
}


const FindAgreement=(req,res)=>{
    if(req.params.id==undefined || isNaN(req.params.id))
    res.status(200).json({status:"failed", message:"invalid data" });
    else{
        find(req.params.id,(err,result)=>{
            console.log(req.params)
            if(err)
            res.status(200).json({status:"failed", message:"internal sever error" });
            else if(result.length==0)
            res.status(200).json({status:"failed", message:"data not found" });
            else
            res.status(200).json({status:"success", data:result[0] });
        })
    }
}

const DeleteAgreement=(req,res)=>{
    if(req.params.id==undefined || isNaN(req.params.id))
    res.status(200).json({status:"failed", message:"invalid data" });
    else
    res.status(200).json({status:"failed", message:"contact to admin" });
}

const VerifyAgreement=(req,res)=>{
    if(req.params.id==undefined || isNaN(req.params.id))
    res.status(200).json({status:"failed", message:"invalid data" });
    else{
        verify(req.params.id,(err,result)=>{
            if(err)
            res.status(200).json({status:"failed", message:"internal server error"});
            else if(result.affectedRows)
            res.status(200).json({status:"success", message:"agrement verifyed" });
            else 
            res.status(200).json({status:"failed", message:"agreement id invalid"});      
        })
    }
}
module.exports={AddInvesmentAgreement,AddAssociateAgreement,UploadAssociateAgreement,UploadInvesmentAgreement,FindAgreement,DeleteAgreement,VerifyAgreement}
