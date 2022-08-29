const router=require("express").Router();
const {AddAccount,UpdateAccount,FindAccount,FindUserAccounts,DeleteAccount}=require('./controller');

/*******************************************
 * To handle all Valid Request
 *******************************************/

 router.post("/",AddAccount);
 router.post("/update",UpdateAccount);
 router.get("/:account_no",FindAccount);
 router.post("/accounts",FindUserAccounts);
 router.get("/delete/:account_no",DeleteAccount);

 
  /*To handle all invalid request */  
  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid request"
    });
    });  

module.exports=router;