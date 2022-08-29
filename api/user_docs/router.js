const router=require("express").Router();


const {AddDocument,UpdateDocument,FindDocument,DeleteDocument}=require("./controller");


/*******************************************
 * To handle all Valid Request
 *******************************************/

 router.post("/",AddDocument);
 router.post("/update",UpdateDocument);
 router.post("/find",FindDocument);
 router.post("/delete",DeleteDocument);


  /*To handle all invalid request */  
  router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid Request"
    });
    });  

module.exports=router;
