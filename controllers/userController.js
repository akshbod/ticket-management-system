'use strict';

const commonHelpers = require('../helpers/commonHelper');
const commonValidations = require('../helpers/commonValidation');
const userModel = require('../models/userModel');

const userController = {
    
    /**
     * Create user.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    createUser: async (req, res) => {
        const data = req.body;
        let eCommonResponse = {};
    
        try {
            let error = commonValidations.createUser(data, res);
            if(error) return res.status(400).json(error);

            const hashedPassword = await commonHelpers.hashPassword(data.password);
            const user = await userModel.createUser(data, hashedPassword);
            
            if(user.length > 0) {
                eCommonResponse.returnmsg = 'Successful';
                eCommonResponse.returnvalue = 'User Created Successfully!';
                res.status(201).json(eCommonResponse);
            } else {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Something went wrong!';
                res.status(400).json(eCommonResponse);
            }
    
        } catch (error) {
            console.error('Error: ', error);
    
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = `Error: ${error.message}`;
            return res.status(500).send(eCommonResponse);
        }
    }, // createUser END
    
    
    /**
     * Login.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    login: async (req, res) => {
        const data = req.body;
        let eCommonResponse = {};
    
        try {
            let error = commonValidations.login(data, res);
            if(error) return res.status(400).json(error);

            const user = await userModel.login(data);
            const compareResults = await commonHelpers.comparePassword(data.password, user[0].password)
            
            if (user.length>0 && compareResults) {
                
                let payload = {name:user[0].name, email:user[0].email, user_type:user[0].user_type}
                payload.token = await commonHelpers.generateToken(payload);
    
                eCommonResponse.returnmsg = 'Successful';
                eCommonResponse.returnvalue = payload;
                return res.status(200).json(eCommonResponse);
    
            } else {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Invalid credentials!';
                return res.status(400).json(eCommonResponse);
            }
    
        } catch (error) {
            console.error('Error: ', error);
    
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = `Error: ${error.message}`;
            return res.status(500).send(eCommonResponse);
        }
    }, // login END

    
}


module.exports = userController;