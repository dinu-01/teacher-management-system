const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); 
const {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignToClass
} = require('../controllers/teacherController');

// Routes - upload middleware එක add කරන්න
router.route('/')
  .get(getTeachers)
  .post(upload.single('profilePicture'), createTeacher); 

router.route('/:id')
  .get(getTeacherById)
  .put(upload.single('profilePicture'), updateTeacher) 
  .delete(deleteTeacher);

router.route('/:id/assign-class')
  .post(assignToClass);

module.exports = router;