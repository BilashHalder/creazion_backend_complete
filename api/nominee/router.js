const router=require("express").Router();
const {AddNominee,UpdateNominee,FindNominees,DeleteNominee,NomineeInfo}=require('./controller');




/*******************************************
 * To handle all Valid Request
 *******************************************/


 router.post("/",AddNominee);
 router.post("/update",UpdateNominee);
 router.post("/user",FindNominees);
 router.get("/:id",NomineeInfo);
 router.get("/delete/:id",DeleteNominee);


/*To handle all invalid request */  
router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid request"
    });
    }); 

module.exports=router;

