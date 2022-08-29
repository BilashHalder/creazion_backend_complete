const router=require("express").Router();
const {AddCustomer,UpdateCustomer,FindCustomer,DeleteCustomer,UpdatePassword,ForgetPassword}=require("./controller");

/*******************************************
 * To handle all Valid Request
 *******************************************/
 router.post("/",AddCustomer);
 router.post("/update",UpdateCustomer);
 router.get("/:id",FindCustomer);
 router.post("/updatepass",UpdatePassword);
 router.get("/forget/:id",ForgetPassword);
 router.get("/delete/:id",DeleteCustomer);

 

  /*To handle all invalid request */  
  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid request"
    });
    });  

module.exports=router;