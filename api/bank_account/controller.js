const { add, update, find, findaccounts, remove } = require("./services");
//user_id	user_type	account_no	ifsc_code	bank_name	status 

const AddAccount = (req, res) => {
    data = req.body;
    if (data.user_id == undefined || data.user_type == undefined || data.account_no == undefined || data.ifsc_code == undefined || data.bank_name == undefined)
        res.status(200).json({status:"failed", message: "invalid data" });
    else {
        find(data.account_no, (err, result) => {
            if (err)
                res.status(200).json({ status: "failed", message: "internal server error" });
            else if (result.length)
                res.status(200).json({ status: "failed", message: "bank account already used" });
            else {
                //account verifacation api call
                data.status = 1;//by default its verified
                findaccounts(data, (err, result) => {
                    if (err)
                        res.status(200).json({ status: "failed", message: "internal server error" });
                    else if (result.length > 4)
                        res.status(200).json({ status: "failed", message: "maximum number reached" });
                    else {
                        add(data, (err, result) => {
                            if (err)
                                res.status(200).json({ status: "failed", message: "internal server error" });
                            else
                                res.status(200).json({ status: "success", message: "data saved" });
                        });
                    }
                })
            }
        })
    }

}
const UpdateAccount = (req, res) => {
    data = req.body;
    if (data.user_id == undefined || data.user_type == undefined || data.account_no == undefined || data.ifsc_code == undefined || data.bank_name == undefined)
        res.status(200).json({ status:"failed",message: "invalid data" });
    else {
        update(data, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });

            else if (result.affectedRows)
                res.status(200).json({status:"success", message: "data updated" });

            else
                res.status(200).json({ status:"failed",message: "invalid data" });
        });
    }
}

const FindAccount = (req, res) => {
    if (req.params.account_no == undefined)
        res.status(200).json({status:"failed", message: "invalid data" });
    else {
        find(req.params.account_no, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });

            else if (result.length == 0)
                res.status(200).json({status:"failed", message: "No data Found" });

            else {
                result = result[0];
                res.status(200).json({status:"success", data: result });
            }

        });
    }
}

const FindUserAccounts = (req, res) => {
    let data = req.body;
    if (data.user_id == undefined || data.user_type == undefined)
        res.status(200).json({status:"failed", message: "invalid data" });

    else {
        findaccounts(data, (err, result) => {
            if (err)
                res.status(200).json({status:"failed", message: "internal server error" });

            else if (result.length == 0)
                res.status(200).json({ status:"failed",message: "No data Found" });

            else {
                res.status(200).json({ status:"success",data: result });
            }

        });
    }
}


const DeleteAccount = (req, res) => {
    if (req.params.account_no == undefined) {
        res.status(200).json({status:"failed",
            message: "invalid data"
        });
    }
    else {
        remove(req.params.account_no, (err, result) => {
            if (err)
                res.status(200).json({ status:"failed",message: "internal server error" });
            else if (result.affectedRows == 0)
                res.status(200).json({ status:"failed",message: "invalid request" });
            else
                res.status(200).json({status:"success", message: "data deleted" });
        });
    }
}


module.exports = { AddAccount, UpdateAccount, FindAccount, FindUserAccounts, DeleteAccount }

