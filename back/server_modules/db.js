const mysql = require("mysql");
const util = require("util");

const dbConfig = {
    host: "localhost",
    user: "user",
    password: "user",
    database: "blog"
};

/**
 * Function makes query to the database and return the result(as Promise with object).
 * @param {string} sqlQuery any sql query, "?" can be used
 * @param {array<string>} params params for all "?" in sql query, can be also null
 * @returns {Promise} promise with result object
 */
const makeQuery = async (sqlQuery , params) => {
    const con = mysql.createConnection(dbConfig);
    const query = util.promisify(con.query).bind(con);

    try {
        if(params !== null)
            return await query(sqlQuery, params);
        else
            return await query(sqlQuery);
    } catch(err){
        console.log("Error during getting data from DB:");
        console.log(err);
    } finally {
        con.end();
    }
}

module.exports.makeQuery = makeQuery;