'use strict';

const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const commonHelpers = {

    hashPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },
    
    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },

    generateToken: async(user) => {
        return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8 days' })
    },

    verifyToken: async(token) => {
        try {
            return jwt.verify(token,  process.env.JWT_SECRET);
        } catch (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.message;
            return eCommonResponse;
        }
    },

    query: async function(queryString, params) {
        const self = this;
        console.log('queryString: ', queryString);
        console.log('queryParams: ', params);

        if (!params) {
            params = [];
        } else {
            for (let i = 0; i < params.length; i++) {
                params[i] = self._stripScripts(params[i]);
            }
        }

        let query_result = await pool.query(queryString, params);
        return query_result.rows;
    },

    _stripScripts(text) {
        const self = this;

        if (text == undefined || text == null || (typeof text !== 'string')) {
            return text
        } else {
            return self._getDomPurify(text);
        }
    },

    _getDomPurify(str) {
        const { JSDOM } = require('jsdom');
        const dompurify = require('dompurify');
    
        let window = (new JSDOM('')).window;
        let DOMPurify = dompurify(window);
    
        let sanitized = DOMPurify.sanitize(str, {
            USE_PROFILES: { html: false },             // Disable built-in HTML profiles
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],  
            FORBID_TAGS: ['style', 'script'],         
            KEEP_CONTENT: true                         
        });
    
        console.log('Sanitized:', sanitized);
        return sanitized;
    }
    
}



module.exports = commonHelpers;
