const dbcon = require("../../config/mysql_db_config");
//	id	printed_on	upload_on	file_url	status		

const add = (data, callBack) => {
    dbcon.query('INSERT INTO agreement(file_url,status) VALUES (?,?)',
     [data.file_url,data.status], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const update = (data, callBack) => {
    dbcon.query('UPDATE agreement SET upload_on=CURRENT_TIMESTAMP(),file_url=?,status=? WHERE id=?', [data.file_url,0,data.id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const verify = (id, callBack) => {
    dbcon.query('UPDATE agreement SET status=1 WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (id, callBack) => {
    dbcon.query('SELECT * FROM agreement WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const remove = (id, callBack) => {
    dbcon.query('DELETE FROM agreement WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,find,verify,remove}

