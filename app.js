require('dotenv').config();
const express=require("express");
const fileUpload = require('express-fileupload');
const app=express();
const cors = require('cors');
app.use(fileUpload());

/***************************
 * Import router of all Models
 ****************************/
const AssociateRouter=require("./api/associate/router");
const UserDocRouter=require("./api/user_docs/router");
const PaymentRouter=require("./api/payment/router");
const NomineeRouter=require("./api/nominee/router");
const InvesmentRouter=require("./api/invesment/router");
const BankAccountRouter=require("./api/bank_account/router");
const AgreementRouter=require("./api/agreement/router");
const CustomerRouter=require("./api/customer/router");
const LoginRouter=require("./api/login/router");
/**
 * Middleware for js object to json data
 */

app.use(cors());
app.use(express.json());




/********************************************
 * Define all the valid routes for api calls
 ********************************************/



app.use("/api/associate",AssociateRouter);
app.use("/api/nominee",NomineeRouter);
app.use("/api/payment",PaymentRouter);
app.use("/api/user_docs",UserDocRouter);
app.use("/api/invesment",InvesmentRouter);
app.use("/api/bankaccount",BankAccountRouter);
app.use("/api/agreement",AgreementRouter);
app.use("/api/customer",CustomerRouter);
app.use("/api/login",LoginRouter); 


/************************
 * Api Documentaion Url
 *************************/
 app.get("/",(request,response)=>{
    response.send("API Documentation");
});

/****************************
 * To handle all invalid request
 * ***************************/

 app.all("*",(request,response)=>{
    response.status(500).json({
        message:"invalid request"
    });
    });


/*Server Initilization */
    app.listen(process.env.APP_PORT,()=>{
        console.log(`Api Server Running on Port No : ${process.env.APP_PORT}`);
    });
