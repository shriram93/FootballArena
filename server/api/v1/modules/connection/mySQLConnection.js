const mysql = require('mysql');
const mySQLConnParams = require('../../../../config').mySql;

// Create a connection to the mySQL database
const con = mysql.createConnection(mySQLConnParams);

con.connect((err) => {
    if (err) {
        console.log('Error connecting to mySQL database');
        return;
    }
    console.log('Connection MySql DB established');
});

module.exports = con;