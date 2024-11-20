'use strict';

const commonValidations = require('../helpers/commonValidation');
const ticketModel = require('../models/ticketModel');

const ticketController = {

    /**
     * Create a ticket.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    createTicket: async (req, res) => {
        const data = req.body;
        let eCommonResponse = {};

        try {

            let error = commonValidations.createTicket(data, res);
            if (error) return res.status(400).json(error);

            const ticket = await ticketModel.createTicket(data);

            if (ticket.length > 0) {
                eCommonResponse.returnmsg = 'Successful';
                eCommonResponse.returnvalue = 'Ticket Created Successfully';
                return res.status(201).json(eCommonResponse);
            } else {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Ticket creation failed!';
                return res.status(400).send(eCommonResponse);
            }

        } catch (error) {
            console.error('Error: ', error);

            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = `Error: ${error.message}`;
            return res.status(500).send(eCommonResponse);
        }
    }, // createTicket END


    /**
     * Assign a user to a ticket.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    assignUserToTicket: async (req, res) => {
        const data = { ...req.body, ticketId: req.params.ticketId };
        let eCommonResponse = {};

        try {

            let error = commonValidations.assignUserToTicket(data, res);
            if (error) return res.status(400).json(error);

            const ticket = await ticketModel.getTicketDetails(data);

            if(ticket.length <= 0) {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Invalid Ticket ID';
                return res.status(400).send(eCommonResponse);
            };

            if(ticket[0].status === 'closed') {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Cannot assign users to a closed ticket';
                return res.status(400).send(eCommonResponse);
            };

            const user = await ticketModel.getUserDetails(data);
            
            if(user.length <= 0) {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'User does not exist';
                return res.status(400).send(eCommonResponse);
            };
            
            let alreadyAssignedUsers = ticket[0].assigned_users ? ticket[0].assigned_users.split(',') : '';

            if(alreadyAssignedUsers.length > 5) {  
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'User assignment limit reached';
                return res.status(400).send(eCommonResponse);
            };
        
            if(user[0].user_type === 1 || data.userId === ticket[0].created_by) {

                let isExists = alreadyAssignedUsers ? alreadyAssignedUsers.find(u => u == data.userId): false;

                if(isExists) {
                    eCommonResponse.returnmsg = 'Unsuccessful';
                    eCommonResponse.returnvalue = 'User cannot be assigned to the same ticket more than once.';
                    return res.status(400).send(eCommonResponse);
                } 

                let par;

                if(ticket[0].assigned_users) {
                    par = `${ticket[0].assigned_users},${data.userId}`
                } else {
                    par = `${data.userId}`
                }

                const updatedTicket = await ticketModel.assignUserToTicket(data, par);

                if (updatedTicket.length > 0) {
                    eCommonResponse.returnmsg = 'Successful';
                    eCommonResponse.returnvalue = 'User assigned successfully';
                    return res.status(201).json(eCommonResponse);
                } else {
                    eCommonResponse.returnmsg = 'Unsuccessful';
                    eCommonResponse.returnvalue = 'Something went wrong!';
                    return res.status(400).send(eCommonResponse);
                }

            } else {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'User Unauthorized';
                return res.status(400).send(eCommonResponse);
            }
            
        } catch (error) {
            console.error('Error: ', error);

            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = `Error: ${error.message}`;
            return res.status(500).send(eCommonResponse);
        }
    }, // assignUserToTicket END


    /**
     * Get Ticket Details.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    getTicketDetails: async (req, res) => {
        const data = req.params;
        let eCommonResponse = {};

        try {

            let error = commonValidations.getTicketDetails(data, res);
            if (error) return res.status(400).json(error);

            const ticket = await ticketModel.getTicketDetails(data);

            if (ticket.length > 0) {

                let assigned_users = ticket[0].assigned_users;
                const users = await ticketModel.getTicketAssignedUsers(assigned_users);

                let statistics = {
                    totalAssigned: users ? users.length : 0,
                    status: ticket[0].status
                };

                let final = {ticket, assignedUsers: users, statistics};

                eCommonResponse.returnmsg = 'Successful';
                eCommonResponse.returnvalue = final;
                return res.status(201).json(eCommonResponse);
            } else {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'Ticket not found!';
                return res.status(400).send(eCommonResponse);
            }

        } catch (error) {
            console.error('Error: ', error);

            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = `Error: ${error.message}`;
            return res.status(500).send(eCommonResponse);
        }
    }, // getTicketDetails END


    /**
     * Get a ticket analytics.
     * Created by: Akshay
     * Date: 19-11-2024
    */
    getTicketsAnalytics: async (req, res) => {
        const data = req.query;
        let eCommonResponse = {};

        try {

            let error = commonValidations.getTicketsAnalytics(data, res);
            if (error) return res.status(400).json(error);

            let where = `1=1`;

            if(data.fromdate && data.todate) {
                where += ` and createddate >= '${data.fromdate} 00:00:00' and createddate <= '${data.todate} 23:59:59'`;
            }  
            
            if(data.status) {
                where += ` and status = '${data.status}'`;
            }  
            
            if(data.priority) {
                where += ` and priority = '${data.priority}'`;
            }  
            
            if(data.type) {
                where += ` and type = '${data.type}'`;
            }  
            
            if(data.venue) {
                where += ` and venue = '${data.venue}'`;
            };
            
            const analytics = await ticketModel.getTicketsAnalytics(where);

            let ticketsDistribution = { totalTickets: 0, closedTickets:0, openTickets: 0, inProgressTickets: 0 };
            let priorityDistribution = { low:0, medium:0 , high:0 };
            let typeDistribution = { concert: 0, conference: 0, sports: 0 };
            let tickets = [];

            for(let i=0; i<analytics.length; i++) {
                
                ticketsDistribution.totalTickets++;

                if(analytics[i].status == 'closed') {
                    ticketsDistribution.closedTickets++;
                } else if(analytics[i].status == 'open') {
                    ticketsDistribution.openTickets++;
                } else {
                    ticketsDistribution.inProgressTickets++;
                };

                if(analytics[i].priority == 'low') {
                    priorityDistribution.low++;
                } else if(analytics[i].priority == 'medium') {
                    priorityDistribution.medium++;
                } else {
                    priorityDistribution.high++;
                };

                if(analytics[i].type == 'concert') {
                    typeDistribution.concert++;
                } else if(analytics[i].type == 'conference') {
                    typeDistribution.conference++;
                } else {
                    typeDistribution.sports++;
                };

                let obj = {
                    id: analytics[i].id,
                    title: analytics[i].title,
                    status: analytics[i].status,
                    priority: analytics[i].priority,
                    type: analytics[i].type,
                    venue: analytics[i].venue,
                    createdDate: analytics[i].createddate,
                    createdBy: analytics[i].created_by
                };

                tickets.push(obj);
            };

            let final = [{...ticketsDistribution, priorityDistribution, typeDistribution, tickets}];

            if (final.length > 0) {
                eCommonResponse.returnmsg = 'Successful';
                eCommonResponse.returnvalue = final;
                return res.status(201).json(eCommonResponse);
            } else {
                eCommonResponse.returnmsg = 'Unsuccessful';
                eCommonResponse.returnvalue = 'There are no tickets!';
                return res.status(400).send(eCommonResponse);
            }

        } catch (error) {
            console.error('Error: ', error);

            eCommonResponse.returnmsg = 'Unsuccessful';
            eCommonResponse.returnvalue = `Error: ${error.message}`;
            return res.status(500).send(eCommonResponse);
        }
    }, // ticketsAnalytics END    



};


module.exports = ticketController;