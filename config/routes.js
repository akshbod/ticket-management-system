const userController = require('../controllers/userController');
const { createTicket, assignUserToTicket, getTicketDetails, getTicketsAnalytics } = require('../controllers/ticketController');
const middlewares = require('../middlewares/middlewares');
const express = require('express');
const router = express.Router();

// User routes
router.post('/users', userController.createUser);
router.post('/auth/login', userController.login);

// Ticket routes
router.post('/tickets', middlewares.authenticateToken, createTicket);
router.post('/tickets/:ticketId/assign', middlewares.authenticateToken, assignUserToTicket);
router.get('/tickets/analytics', middlewares.authenticateToken, getTicketsAnalytics);
router.get('/tickets/:ticketId', middlewares.authenticateToken, getTicketDetails);

module.exports = router;

