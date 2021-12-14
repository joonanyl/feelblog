const mysql = require('mysql')

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'blog',
   password: 'ok1' 
})

connection.connect()
module.exports = connection