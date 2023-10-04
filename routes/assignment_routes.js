const express = require('express');
const assignmentController = require('../controllers/assignment_controller');
// import * as auth from '../controllers/authentication';
const auth = require('../controllers/authentication');

const router = express.Router();
router.get('/v1/assignments',auth,assignmentController.getAllAssignments)
router.post('/v1/assignments',auth,assignmentController.createAssignment)
router.get('/v1/assignments/:id',auth,assignmentController.getAssignment)
router.delete('/v1/assignments/:id',auth,assignmentController.deleteAssignment)
router.put('/v1/assignments/:id',auth,assignmentController.updateAssignment)

module.exports = router