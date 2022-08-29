const dbcon = require("../../config/mysql_db_config");

//	id	full_name	phone_no	email	commission_rate	agreement_id	
//referred_by	image	pass	created_at	status



const add = (data, callBack) => {
    dbcon.query('INSERT INTO associate(full_name,phone_no,email,commission_rate,referred_by,status) VALUES (?,?,?,?,?,?)',
     [data.full_name,data.phone_no,data.email,data.commission_rate,data.referred_by,1], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const update = (data, callBack) => {
    dbcon.query('UPDATE associate SET full_name=?,phone_no=?,email=?,commission_rate=?,agreement_id=?,referred_by=?,image=?,pass=?,status=? WHERE id=?', 
    [data.full_name,data.phone_no,data.email,data.commission_rate,data.agreement_id,data.referred_by,data.image,data.pass,data.status,data.id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const find = (data, callBack) => {
    dbcon.query('SELECT * FROM associate WHERE phone_no=? OR email=?', [data.phone_no,data.email], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const findbyid = (id, callBack) => {
    dbcon.query('SELECT * FROM associate WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const remove = (id, callBack) => {
    dbcon.query('DELETE FROM associate WHERE id=?', [id], (err, result, fields) => {
        if(err)
        return callBack(err);
        return callBack(null,result);
    });
}

const updatepass=(data,callBack)=>{
    dbcon.query('UPDATE associate SET pass=? WHERE id=?',
    [data.pass,data.id], (err, result, fields) => {
       if(err)
       return callBack(err);
       return callBack(null,result);
   });
    
}

module.exports={add,update,find,findbyid,remove,updatepass}
