'use strict';
const Joi = require('joi');

const commonValidations = {

    /**
     * createUser Validations.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    createUser: (data) => {

        let Obj = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required().messages({
                'string.email': 'Invalid email format.',
                'any.required': 'Email is required.'
            }),
            password: Joi.string().min(8).pattern(/[^A-Za-z0-9]/).required().messages({
                'string.min': 'Password must be at least 8 characters long.',
                'string.pattern.base': 'Password must contain at least one special character.',
                'any.required': 'Password is required.'
            }),
            user_type: Joi.number().allow(null),
            createdby: Joi.number().required(),
        })

        let { error, value } = Obj.validate(data);

        if (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.details[0].message;
            return eCommonResponse;
        } else {
            return
        }
    },


    /**
     * Login Validations.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    login: (data) => {

        let Obj = Joi.object({
            email: Joi.string().email().required()
                .messages({
                    'string.email': 'Invalid email format.',
                    'any.required': 'Email is required.'
                }),
            password: Joi.string().min(8).required()
                .messages({
                    'any.required': 'Password is required.'
                })
        })

        let { error, value } = Obj.validate(data);

        if (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.details[0].message;
            return eCommonResponse;
        } else {
            return
        }
    },


    /**
     * createTicket Validations.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    createTicket: (data) => {

        let Obj = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            type: Joi.string().valid('concert', 'sports', 'conference').required().messages({
                'any.only': 'Event type must be one of "concert", "sport", or "festival".',
                'any.required': 'Event type is required.'
            }),
            venue: Joi.string().required(),
            status: Joi.string().valid('open', 'in-progress', 'closed').required().messages({
                'any.only': 'Status must be one of "open", "in-progress", or "closed".',
                'any.required': 'Status is required.'
            }),
            priority: Joi.string().valid('high', 'low', 'medium').required().messages({
                'any.only': 'Priority must be one of "high", "low".',
                'any.required': 'Priority is required.'
            }),
            dueDate: Joi.string().required(),
            createdBy: Joi.string().required(),
        })

        let { error, value } = Obj.validate(data);

        if (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.details[0].message;
            return eCommonResponse;
        } else {
            return
        }
    },


    /**
     * assignUserToTicket validations.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    assignUserToTicket: (data) => {

        let Obj = Joi.object({
            userId: Joi.number().required(),
            ticketId: Joi.number().required()
        })

        let { error, value } = Obj.validate(data);

        if (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.details[0].message;
            return eCommonResponse;
        } else {
            return
        }
    },


    /**
     * getTicketDetails Validations.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    getTicketDetails: (data) => {

        let Obj = Joi.object({
            // userId: Joi.number().required(),
            ticketId: Joi.string().required()
        })

        let { error, value } = Obj.validate(data);

        if (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.details[0].message;
            return eCommonResponse;
        } else {
            return
        }
    },


    /**
     * getTicketsAnalytics Validations.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    getTicketsAnalytics: (data) => {

        let Obj = Joi.object({
            fromdate: Joi.string().allow(null),
            todate: Joi.string().allow(null),
            status: Joi.string().allow(null),
            priority: Joi.string().allow(null),
            type: Joi.string().allow(null),
            venue: Joi.string().allow(null),
        })

        let { error, value } = Obj.validate(data);

        if (error) {
            let eCommonResponse = {};
            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = error.details[0].message;
            return eCommonResponse;
        } else {
            return
        }
    },


}

module.exports = commonValidations;