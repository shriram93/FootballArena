const jwtToken ={
    secret: 'mysecretpasswordissecret'
}
const moongoseDB = {
    url : "mongodb://localhost:27017/gyanmatrix"
};

const mySql = {
    host: 'localhost',
    user: 'root',
    password: '1308',
    database : 'mysql'
};

module.exports = {
    jwtToken,
    moongoseDB,
    mySql
};