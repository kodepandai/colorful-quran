const fs = require('fs');
const version = require('./package.json').version;

const changelog = fs.readFileSync('./CHANGELOG.md', {
	encoding: 'utf-8'
});
module.exports = { version, changelog };
