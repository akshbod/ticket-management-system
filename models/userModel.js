'use strict';
const commonHelpers = require('../helpers/commonHelper');

const userModel = {

    async createUser(data, hashedPassword) {
        return await commonHelpers.query('INSERT INTO users (name, email, password, user_type, createdby) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, user_type, createddate, createdby', [data.name, data.email, hashedPassword, data.user_type ? 1 : 0, data.createdby]);
    },

    async login(data) {
        return await commonHelpers.query('SELECT id, name, email, password, createdby, createddate, is_active, user_type FROM users WHERE email = $1', [data.email]);
    },
    
    

};

module.exports = userModel;