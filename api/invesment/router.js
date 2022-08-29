const router=require("express").Router();
const {AddInvesment,UpdateInvestment,InvesmentInfo,UserInvesments,DeleteInvesment}=require("./controller");

/*******************************************
 * To handle all Valid Request
 *******************************************/


 router.post("/",AddInvesment);
 router.post("/update",UpdateInvestment);
 router.post("/user",UserInvesments);
 router.get("/:id",InvesmentInfo);
 router.get("/delete/:id",DeleteInvesment);


/*To handle all invalid request */  
router.all("*",(request,response)=>{
    response.status(500).json({
        status:"failed",
        message:"invalid request"
    });
    }); 

module.exports=router;