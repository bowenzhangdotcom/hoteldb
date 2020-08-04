const basicAuth = require('express-basic-auth');

const userAuth = basicAuth({
    users: {'user': 'testuser'}
});

const adminAuth = basicAuth({
    users: {'admin': 'testadmin'}
});

exports.userAuth = userAuth;
exports.adminAuth = adminAuth;