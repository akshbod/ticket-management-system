'use strict';
const commonHelpers = require('../helpers/commonHelper');

const ticketModel = {

    async createTicket(data) {
        return await commonHelpers.query('INSERT INTO tickets (title, description, type, venue, status, priority, due_date, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING title, description, type, venue, status, priority, due_date, created_by ', [data.title, data.description, data.type, data.venue, data.status, data.priority, data.dueDate, data.createdBy]);
    },

    async getTicketDetails(data) {
        return await commonHelpers.query(' select id, title, description, type, venue, status, priority, due_date, created_by, createddate, assigned_users from tickets where id=$1', [data.ticketId]);
    },

    async getUserDetails(data) {
        return await commonHelpers.query('select  t.id, t.name, t.email, t.password, t.createdby, t.createddate, t.is_active, t.user_type  from  users t where id=$1 ', [data.userId]);
    },

    async getTicketAssignedUsers(assignedUsers) {
        return await commonHelpers.query(`select  t.id, t.name, t.email from  users t where id in (${assignedUsers}) `);
    },

    async assignUserToTicket(data, assigned_users) {
        console.log('assigned_users --->', assigned_users)
        return await commonHelpers.query('update tickets set assigned_users=$2 where id=$1 returning id, title, description,assigned_users ', [data.ticketId, assigned_users]);
    },

    async getTicketsAnalytics(where) {
        return await commonHelpers.query(`select id, title, description, type, venue, status, priority, due_date, created_by, createddate, assigned_users, lastmodifiedby, lastmodifieddate from tickets where ${where}`);
    },

};

module.exports = ticketModel;