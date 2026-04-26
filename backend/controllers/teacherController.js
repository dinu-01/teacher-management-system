const Teacher = require('../models/Teacher');

// @desc    Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single teacher
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const teacherData = {
      ...req.body,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : null
    };

    const teacher = await Teacher.create(teacherData);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update teacher
const updateTeacher = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If new picture uploaded
    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (teacher) {
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (teacher) {
      await teacher.deleteOne();
      res.json({ message: 'Teacher removed' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign teacher to class
const assignToClass = async (req, res) => {
  try {
    const { className, subject, term, year } = req.body;
    const teacher = await Teacher.findById(req.params.id);
    
    if (teacher) {
      teacher.assignedClasses.push({
        className,
        subject,
        term,
        year
      });
      
      await teacher.save();
      res.json(teacher);
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions at once (එකම export එකක්)
module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignToClass
};