const dbcon = require("../../config/mysql_db_config");

//user_id user_type pan_no	adhar_no	adhar_status	address  	pan_status

const add = (data, callBack) => {
    dbcon.query('INSERT INTO user_docs(user_id,user_type,pan_no,adhar_no,adhar_status,pan_status,address) VALUES (?,?,?,?,?,?,?)', [data.user_id,data.user_type,data.pan_no,data.adhar_no,data.adhar_status,data.pan_status,data.address], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const update = (data, callBack) => {
    dbcon.query('UPDATE user_docs SET pan_no=?,adhar_no=?,adhar_status=?,pan_status=?,address=? WHERE user_id=? and user_type=?', [data.pan_no,data.adhar_no,data.adhar_status,data.pan_status,data.address,data.user_id,data.user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (data, callBack) => {
    dbcon.query('SELECT * FROM user_docs WHERE user_id=? and user_type=?', [data.user_id,data.user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const remove = (data, callBack) => {
    dbcon.query('DELETE FROM user_docs WHERE user_id=? and user_type=?', [data.user_id,data.user_type], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
module.exports={add,update,find,remove}
