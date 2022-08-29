const dbcon = require("../../config/mysql_db_config");

//user_id	user_type	account_no	ifsc_code	bank_name	status 

const add = (data, callBack) => {
    dbcon.query('INSERT INTO bank_acccount(user_id,user_type,account_no,ifsc_code,bank_name,status) VALUES (?,?,?,?,?,?)', 
    [data.user_id,data.user_type,data.account_no,data.ifsc_code,data.bank_name,data.status], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const update = (data, callBack) => {
    dbcon.query('UPDATE bank_acccount SET ifsc_code=?,bank_name=?,status=? WHERE user_id=? and user_type=? and account_no=?', [data.ifsc_code,data.bank_name,data.status,data.user_id,data.user_type,data.account_no], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (account_no, callBack) => {
    dbcon.query('SELECT * FROM bank_acccount WHERE account_no=?', [account_no], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const findaccounts = (data, callBack) => {
    dbcon.query('SELECT * FROM bank_acccount WHERE user_id=? and user_type=?', [data.user_id,data.user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
const remove = (account_no, callBack) => {
    dbcon.query('DELETE FROM bank_acccount WHERE  account_no=?', [account_no], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,find,findaccounts,remove}
