const dbcon = require("../../config/mysql_db_config");

//	id	customer_id	name	dob	customer_type  nominee
const add = (data, callBack) => {
    dbcon.query('INSERT INTO nominee(customer_id,name,dob,customer_type) VALUES (?,?,?,?)', [data.customer_id,data.name,data.dob,data.customer_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const update = (data, callBack) => {
    dbcon.query('UPDATE nominee SET customer_id=?,name=?,dob=?,customer_type=? WHERE id=?', [data.customer_id,data.name,data.dob,data.customer_type,data.id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const findnominees = (data, callBack) => {
    dbcon.query('SELECT * FROM nominee WHERE customer_id=? and customer_type=?', [data.customer_id,data.customer_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (id, callBack) => {
    dbcon.query('SELECT * FROM nominee WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const remove = (id, callBack) => {
    dbcon.query('DELETE FROM nominee WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,findnominees,find,remove}