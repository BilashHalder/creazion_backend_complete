const router=require("express").Router();
const {AddTransaction,UpdateTransaction,TransactionInfo,userTransactions}=require('./controller');

/*******************************************
 * To handle all Valid Request
 *******************************************/
 

 router.post("/",AddTransaction);
 router.post("/update",UpdateTransaction);
 router.get("/:id",TransactionInfo);
 router.get("/user/:account_no",userTransactions);



  /*To handle all invalid request */  
  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid request"
    });
    });  

module.exports=router;