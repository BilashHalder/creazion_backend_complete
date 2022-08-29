const dbcon = require("../../config/mysql_db_config");

//transaction_id	transaction_time	credit_to	debit_from	ammount	payment_mode	status

const add = (data, callBack) => {
    dbcon.query('INSERT INTO payment(transaction_id,credit_to,debit_from,ammount,payment_mode,status) VALUES (?,?,?,?,?,?)', 
    [data.transaction_id,data.credit_to,data.debit_from,data.ammount,data.payment_mode,data.status], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const update = (data, callBack) => {
    dbcon.query('UPDATE payment SET payment_mode=?,status=? WHERE transaction_id=?', [data.payment_mode,data.status,data.transaction_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const findusertransaction = (account_no, callBack) => {
    dbcon.query('SELECT * FROM payment WHERE debit_from=? OR credit_to =? ORDER BY transaction_time', [account_no,account_no], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (transaction_id, callBack) => {
    dbcon.query('SELECT * FROM payment WHERE transaction_id=? ', [transaction_id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


module.exports={add,update,find,findusertransaction}

