const express = require('express');
const assignmentController = require('../controllers/assignment_controller');
const auth = require('../controllers/authentication');

const router = express.Router();
router.get('/v1/assignments',auth,assignmentController.getAllAssignments)
router.post('/v1/assignments',auth,assignmentController.createAssignment)
router.get('/v1/assignments/:id',auth,assignmentController.getAssignment)
router.delete('/v1/assignments/:id',auth,assignmentController.deleteAssignment)
router.put('/v1/assignments/:id',auth,assignmentController.updateAssignment)
router.patch('/v1/assignments',auth,assignmentController.patch1)
router.patch('/v1/assignments/:id',auth,assignmentController.patch2)
module.exports = router