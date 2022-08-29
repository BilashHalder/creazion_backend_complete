const {add,update,find,remove}=require("./services");

//user_id user_type pan_no	adhar_no	adhar_status	address  	pan_status



/********************************
 ********************************
 ********************************/


 const AddDocument = (req, res) => {

    data = req.body;
    if (data.user_id==undefined|| data.user_type==undefined|| data.pan_no == undefined || data.adhar_no == undefined ||  data.address==undefined || data.adhar_status == undefined || data.pan_status == undefined)
        {
            res.status(200).json({ status:"failed",message: "invalid data" });
        }
    else {

        find(data, (err, result) => {
            if (err)
            res.status(200).json({status:"failed", message: "internal server error" });
            else if(result.length)
            res.status(200).json({status:"failed", message: "already data exist" }); 
            else{
                //api call for adhar and pan verification.....

        add(data, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });
            else {
                res.status(200).json({status:"success",data,});
            }
        });
            }
        });
        
    }
}

const UpdateDocument = (req, res) => {
    data = req.body;
    if (data.pan_no == undefined || data.adhar_no == undefined || data.adhar_status == undefined || data.pan_status == undefined || data.user_id == undefined ||data.user_type==undefined || data.address==undefined)
        {
            console.log(data)
            res.status(200).json({ status:"failed",message: "invalid data" });
        }
    else {
        find(data, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });

            else {
                if (result.length == 0)
                    res.status(200).json({status:"failed", message: "invalid data" });
                else {
                    update(data, (err, result) => {
                        if (err)
                            res.status(200).json({status:"failed", message: "internal server error" });
                        else if (result.affectedRows == 0)
                            res.status(200).json({status:"failed", messgae: "invalid data" });
                        else
                        res.status(200).json({status:"success", message: "data updated" });
                    });
                }

            }
        });
    }
}

const FindDocument = (req, res) => {
    let data=req.body;
    if (data.user_id == undefined || data.user_type==undefined) {
        res.status(200).json({status:"failed", message: "invalid data" });
    }
    else {
        find(data, (err, result) => {
            if (err)
                res.status(200).json({ status:"failed",message: "internal server error" });
            else {
                if (result.length == 0)
                    res.status(200).json({status:"failed", message: "No data Found" });
               else{
                result = result[0];
                res.status(200).json({status:"success",data:result});
               }
            }
        });
    }
}

const DeleteDocument = (req, res) => {
    let data=req.body;
    if (data.user_id == undefined || data.user_type==undefined)
    res.status(200).json({ status:"failed",message: "invalid data" });
    else{
        remove(data, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });
            else if (result.affectedRows == 0)
                res.status(200).json({status:"failed", messgae: "invalid data" });
            else
            res.status(200).json({ status:"success",message: "successfully data deleted" });
        });
    }
}


module.exports = { AddDocument, UpdateDocument, FindDocument, DeleteDocument }
