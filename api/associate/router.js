const router=require("express").Router();
const {AddAssociate,UpdateAssociate,FindAssociate,DeleteAssociate,UpdatePassword,ForgetPassword}=require('./controller');

/*******************************************
 * To handle all Valid Request
 *******************************************/

 router.post("/",AddAssociate);
 router.post("/update",UpdateAssociate);
 router.get("/:id",FindAssociate);
 router.post("/updatepass",UpdatePassword);
 router.get("/forgetpass/:id",ForgetPassword);
 router.get("/delete/:id",DeleteAssociate);
 

  /*To handle all invalid request */  

  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"inavalid request"
    });
    });  

module.exports=router;
