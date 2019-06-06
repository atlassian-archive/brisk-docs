const { toLambda } = require('probot-serverless-now');

const applicationFunction = require('./app');

module.exports = toLambda(applicationFunction);
