const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: 'mypassword',
    database: 'mydatabase'

});

async function getConnection() {
    try{
        const connection = await pool.getConnection();
        return connection;
    }catch(error){
        console.log(error);
    }

}

module.exports = {getConnection};