const dbcon = require("../../config/mysql_db_config");


//id	customer_id	ammount	commission_rate	transaction_id	nominee_id	
//account_no	agreement_id	referred_by	customer_type


const add = (data, callBack) => {
    dbcon.query('INSERT INTO investment(customer_id,ammount,commission_rate,transaction_id,nominee_id,account_no, agreement_id,referred_by,customer_type) VALUES (?,?,?,?,?,?,?,?,?)',
     [data.customer_id,data.ammount,data.commission_rate,data.transaction_id,data.nominee_id,data.account_no,null,data.referred_by,data.customer_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}



const update = (data, callBack) => {
    dbcon.query('UPDATE investment SET customer_id=?,commission_rate=?,nominee_id=?,account_no=?,agreement_id=?,referred_by=?,customer_type=? WHERE id=?', 
    [data.customer_id,data.commission_rate,data.nominee_id,data.account_no,data.agreement_id,data.referred_by,data.customer_type,data.id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const find = (id, callBack) => {
    dbcon.query('SELECT * FROM investment WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const finduserinvesments = (data, callBack) => {
    dbcon.query('SELECT * FROM investment WHERE customer_id=? and customer_type=?', [data.customer_id,data.customer_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const remove = (id, callBack) => {
    dbcon.query('DELETE FROM investment WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const transactionexist=(transaction_id, callBack) => {
    dbcon.query('SELECT * FROM investment WHERE transaction_id=?', [transaction_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
module.exports={add,update,find,finduserinvesments,remove,transactionexist}

