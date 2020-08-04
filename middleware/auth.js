const basicAuth = require('express-basic-auth');
require('dotenv').config();

const getUnauthRes = (req) => {
    return req.auth
    ? (`Credentials ${req.auth.user} : ${req.auth.password} are invalid`)
    : 'No credentials provided'
};

function generalAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.generalName);
    const passwordMatches = basicAuth.safeCompare(password, process.env.generalPassword);
    return userMatches && passwordMatches || adminAuthorizer(username, password);
}

function adminAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.adminName);
    const passwordMatches = basicAuth.safeCompare(password, process.env.adminPassword);
    return userMatches && passwordMatches
}

const generalAuth = basicAuth({
    authorizer: generalAuthorizer,
    unauthorizedResponse: getUnauthRes
});

const adminAuth = basicAuth({
    authorizer: adminAuthorizer,
    unauthorizedResponse: getUnauthRes
});

exports.generalAuth = generalAuth;
exports.adminAuth = adminAuth;