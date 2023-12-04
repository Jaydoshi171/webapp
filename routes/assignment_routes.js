const express = require('express');
const assignmentController = require('../controllers/assignment_controller');
const auth = require('../controllers/authentication');

const router = express.Router();
router.get('/v2/assignments',auth,assignmentController.getAllAssignments)
router.post('/v2/assignments',auth,assignmentController.createAssignment)
router.post('/v2/assignments/:id/submission',auth,assignmentController.postSubmission)
router.get('/v2/assignments/:id',auth,assignmentController.getAssignment)
router.delete('/v2/assignments/:id',auth,assignmentController.deleteAssignment)
router.put('/v2/assignments/:id',auth,assignmentController.updateAssignment)
router.patch('/v2/assignments',auth,assignmentController.patch1)
router.patch('/v2/assignments/:id',auth,assignmentController.patch2)

module.exports = router