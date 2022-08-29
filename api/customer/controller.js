const {add,update,find,findbyid,remove,updatepass}=require("./services");

const bcrypt=require('bcrypt');
const saltRound=10;



//full_name	phone_no	email	pass	image	status
const AddCustomer=(req,res)=>{
let data=req.body;
if(data.full_name==undefined || data.email==undefined || data.phone_no==undefined)
res.status(200).json({status:"failed", message:"invalid data" }); 
else{
    find(data,(err,result)=>{
        if(err)
        res.status(200).json({status:"failed", message:"internal server error" }); 
        else if(result.length)
         res.status(200).json({status:"failed", message:"email or phone number already registerd" }); 
        else{
            add(data,(err,result)=>{
                if(err)
                res.status(200).json({status:"failed", message:"internal server error" });
                else {
                    data.id=result.insertId;
                    res.status(200).json({status:"success", data, }); 
                }
               
            });
        }
    }); 
}
}

//customer id
const UpdateCustomer=(req,res)=>{
  let data=req.body;
  if(data.id==undefined)
  res.status(200).json({status:"failed", message:"invalid data"});  
  else{
    findbyid(data.id,(err,result)=>{
        if(err)
                 res.status(200).json({ status:"failed",message:"internal server error" });           
            else if(result.length==0)
                     res.status(200).json({status:"failed", message:"No data Found" });  
             else{
                let cusinfo=result[0];
                if(req.body.full_name)
                cusinfo.full_name=req.body.full_name;
                if(req.body.phone_no)
                cusinfo.phone_no=req.body.phone_no;
                if(req.body.email)
                cusinfo.email=req.body.email;
                if(req.body.status)
                cusinfo.status=req.body.status;
                   if( req.files!=undefined && req.files.image!=undefined){
                    cusimg = req.files.image;
                    originalname= cusimg.name;
                    fileExt=originalname.split('.').at(-1);
                    newName=Date.now()+''+cusinfo.id+'.'+fileExt;
                    let uploadPath=__dirname+'../../../documents/image/'+newName;
                    cusimg.mv(uploadPath, function(err) {
                        if(err)
                        res.status(200).json({status:"failed", message:"internal server error"});
                        else
                        {
                            cusinfo.image=newName;
                            console.log(cusinfo)
                            update(cusinfo,(err,result)=>{
                                if(err)
                                res.status(200).json({status:"failed", message:"internal server error"});
                                else if(result.affectedRows)
                                res.status(200).json({status:"success", message:"data updated" });
                                else 
                                res.status(200).json({status:"failed", message:"internal server error"});
                            });
                           
                        }
                    });
                   }

                 else{
                    update(cusinfo,(err,result)=>{
                        if(err)
                        res.status(200).json({status:"failed", message:"internal server error"});
                        else if(result.affectedRows)
                        res.status(200).json({status:"success", message:"data updated" });
                        else 
                        res.status(200).json({status:"failed", message:"internal server error"});
                    });
                 }                                          
             }
                
               
    });
  }

}

const FindCustomer=(req,res)=>{
    if(req.params.id==undefined){
        res.status(200).json({status:"failed", message:"invalid data"}); 
    }
    else{
        let temp={email:req.params.id,phone_no:req.params.id}
        find(temp,(err,result)=>{
            if(err)
                 res.status(200).json({ status:"failed",message:"internal server error" });           
            else if(result.length==0)
                     res.status(200).json({status:"failed", message:"No data Found" });  
             else
                 res.status(200).json({status:"success",  data:result[0] });
               
                
            
        });
    }
}


const DeleteCustomer=(req,res)=>{
    if(req.params.id==undefined || isNaN(req.params.id)){
        res.status(400).json({status:"failed",message:"invalid data" });
    }
    else{
        remove(req.params.id,(err,result)=>{
            if(err)
                    res.status(200).json({ status:"failed",message:"internal server error"});
                    else if(result.affectedRows==0)
                    res.status(200).json({ status:"failed", message:"invalid request"});
                    else 
                    res.status(200).json({status:"success",message:"data deleted"});
        });
    }
}


//old_pass new_pass user_email or user_phone

const UpdatePassword=(req,res)=>{
    let email_phone=req.body.email_phone;
    if(email_phone==undefined)
    res.status(200).json({status:"failed",message:"invalid data" });
   else{
    let temp={email:email_phone,phone_no:email_phone}
    find(temp,(err,result)=>{
        if(err)
        res.status(200).json({ status:"failed",message:"internal server error" });           
       else if(result.length==0)
            res.status(200).json({status:"failed", message:"invalid email or phone no" });  
          else{
            let temp=result[0];
            if(temp.pass==null){
               if(req.body.pass==undefined)
                res.status(200).json({status:"failed", message:"password can't blank" });
               else{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.pass, salt);
                let udata={id:temp.id,pass:hash}
                updatepass(udata,(err,result)=>{
                    if(err)
                    res.status(200).json({ status:"failed",message:"internal server error" }); 
                    else
                        res.status(200).json({ status:"success",message:"password saved" });  
                });
               }
            }
            else{
               // res.status(200).json({status:"success",  data:result[0] });
               if(req.body.old_pass==undefined)
               res.status(200).json({status:"failed", message:"invalid old password" });
               else if(!bcrypt.compareSync(req.body.old_pass, result[0].pass))
                res.status(200).json({status:"failed", message:"invalid old password" });
               else{
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.pass, salt);
                let udata={id:temp.id,pass:hash}
                updatepass(udata,(err,result)=>{
                    if(err)
                    res.status(200).json({ status:"failed",message:"internal server error" }); 
                    else
                        res.status(200).json({ status:"success",message:"password reset" });  
                });
               }
            }
           
         }
        
    });
   }
}

//email or phone no 
const ForgetPassword=(req,res)=>{
if(req.params.id==undefined)
res.status(200).json({status:"failed",message:"invalid data" });
else{
    let temp={email:req.params.id,phone_no:req.params.id}
    find(temp,(err,result)=>{
        if(err)
        res.status(200).json({ status:"failed",message:"internal server error" });           
         else if(result.length==0)
        res.status(200).json({status:"failed", message:"invalid email or phone no" });  
          else{
            //email reset link 
            res.status(200).json({status:"success", message:"password reset link send on your email" }); 
        }});

}
}


module.exports={AddCustomer,UpdateCustomer,FindCustomer,DeleteCustomer,UpdatePassword,ForgetPassword}
