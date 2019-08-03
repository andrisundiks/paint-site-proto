const users = require('./users');

// Passing main router from the index.js to the routes/users.js, thus keeping code cleaner
module.exports = router => {
    users(router);
    return router;
};