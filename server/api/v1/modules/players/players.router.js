const router = require('express').Router();
const playersDAO = require('./players.dao');
const auth = require('../auth');

//protect notes routes
router.use(auth.isAuthenticated);

// Api to get player details and paginate if requested
router.get('/', (req, res) => {
    let page, limit;
    if (req.query.page) {
        page = parseInt(req.query.page);
        if (isNaN(page) || page < 1) {
            page = 1;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            if (isNaN(limit) || limit < 1) {
                limit = 10;
            }
        } else {
            limit = 10;
        }
    }

    playersDAO.getPlayers({page,limit}, (err, players) => {
        if (err)
            res.status(500).send("Internal Server Error");
        else
            res.status(200).send(players);
    });

});
module.exports = router;