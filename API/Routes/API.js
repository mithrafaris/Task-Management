const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const{google} = require('../Controller/authController');
const { signUp, signIn, signOut,  } = require('../Controller/userController');
const { CreateTask, Taskslist, getUserTasks, } = require('../Controller/taskController');
const router = express.Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);
router.get('/signOut', signOut);

router.post('/create', verifyToken, CreateTask);


module.exports = router;