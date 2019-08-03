const controller = require('../controllers/users');

// This simply passes the controllers to the router, depending on request
module.exports = router => {
    router.route('/users')
        .post(controller.add);

    router.route('/login')
        .post(controller.login)
};