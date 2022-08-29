const router=require("express").Router();


const {LoginCustomer,LoginAdmin,LoginAssociate}=require("./controller");


/*******************************************
 * To handle all Valid Request
 *******************************************/

 router.post("/customer",LoginCustomer);
 router.post("/admin",LoginAdmin);
 router.post("/associate",LoginAssociate);


  /*To handle all invalid request */  
  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid Request"
    });
    });  

module.exports=router;
