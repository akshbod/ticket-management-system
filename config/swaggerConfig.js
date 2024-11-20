const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Load YAML file
const swaggerPath = path.join(__dirname, '../docs/swagger.yaml');
const swaggerDocument = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));

module.exports = swaggerDocument;
