const mysql = require('mysql')

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'user',
   database: 'blog',
   password: 'user'
})

connection.connect()
module.exports = connection