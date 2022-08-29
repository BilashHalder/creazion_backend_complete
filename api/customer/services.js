const dbcon = require("../../config/mysql_db_config");
//full_name	phone_no	email	pass	image	status

const add = (data, callBack) => {
    dbcon.query('INSERT INTO customer(full_name,phone_no,email,status) VALUES (?,?,?,?)',
     [data.full_name,data.phone_no,data.email,1], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}


const updatepass=(data,callBack)=>{
    dbcon.query('UPDATE customer SET pass=? WHERE id=?',
    [data.pass,data.id], (err, result, fields) => {
       if(err)
       return callBack(err);
       return callBack(null,result);
   });
    
}
const update = (data, callBack) => {
    dbcon.query('UPDATE customer SET full_name=?,phone_no=?,email=?,image=?,status=? WHERE id=?', [data.full_name,data.phone_no,data.email,data.image,data.status,data.id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (data, callBack) => {
    dbcon.query('SELECT * FROM customer WHERE phone_no=? OR email=?', [data.phone_no,data.email], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
const findbyid = (id, callBack) => {
    dbcon.query('SELECT * FROM customer WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}
const remove = (id, callBack) => {
    dbcon.query('DELETE FROM customer WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

module.exports={add,update,find,findbyid,remove,updatepass}

