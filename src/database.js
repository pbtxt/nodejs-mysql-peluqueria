const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    if (err){
        if (err.code == "PROTOCOL_CONNECTION_LOST"){
            console.log('DATABASE CONNECTION WAS CLOSED');
        } 
        if (err.code=="ER_CON_COUNT_ERROR"){
            console.log("DATABASE HAS TOO MANY CONNECTIONS");
        } 
        if(err.code == "ECONNREFUSED"){
            console.log("DATABASE CONNECTION WAS REFUSED");
        }
    } 
    if (connection) connection.release();
    // console.log("DB IS CONNECTED");
    return;
});

//estamos convirtiendo en promesas lo que antes eran callbacks
 
pool.query = promisify(pool.query);
module.exports = pool;
