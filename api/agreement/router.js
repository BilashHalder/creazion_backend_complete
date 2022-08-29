const router=require("express").Router();


const {AddInvesmentAgreement,AddAssociateAgreement,UploadAssociateAgreement,UploadInvesmentAgreement,FindAgreement,DeleteAgreement,VerifyAgreement}=require('./controller');
/*******************************************
 * To handle all Valid Request
 *******************************************/
 
 router.post("/add/associate",AddAssociateAgreement);
 router.post('/add/invesment',AddInvesmentAgreement);

 router.post("/upload/associate",UploadAssociateAgreement);
 router.post("/upload/invesment",UploadInvesmentAgreement);
 
 router.get("/:id",FindAgreement);
 router.get("/delete/:id",DeleteAgreement);
 router.get("/verify/:id",VerifyAgreement);

 

  /*To handle all invalid request */  
  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid request"
    });
    });  
module.exports=router;