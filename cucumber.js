const config = require('./cucumber.profiles.json')[process.env.PROFILE || 'default'];

module.exports = { default: config };
