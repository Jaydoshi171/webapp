const express = require('express');
const assignmentController = require('../controllers/assignment_controller');
const auth = require('../controllers/authentication');

const router = express.Router();
router.get('/demo/assignments',auth,assignmentController.getAllAssignments)
router.post('/demo/assignments',auth,assignmentController.createAssignment)
router.post('/demo/assignments/:id/submission',auth,assignmentController.postSubmission)
router.get('/demo/assignments/:id',auth,assignmentController.getAssignment)
router.delete('/demo/assignments/:id',auth,assignmentController.deleteAssignment)
router.put('/demo/assignments/:id',auth,assignmentController.updateAssignment)
router.patch('/demo/assignments',auth,assignmentController.patch1)
router.patch('/demo/assignments/:id',auth,assignmentController.patch2)

module.exports = router
