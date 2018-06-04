const db = require('../connection').mySQLConnection;

//Get all players and paginate if requested
const getPlayers = ({
    limit,
    page
}, done) => {

    let query = "SELECT * FROM footballers";
    if (page && limit) {
        const offset = (page - 1) * limit;
        query = `${query} LIMIT ${offset}, ${limit}`;
    }

    db.query(query, function (err, result, fields) {
        if (err)
            return done(err);
        else
            return done(err, result);
    });

};

module.exports = {
    getPlayers
}