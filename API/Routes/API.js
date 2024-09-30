const express = require('express');
const { verifyToken } = require('../utils/verifyUser');
const{google} = require('../Controller/authController');
const { signUp, signIn, signOut, getUserTasks } = require('../Controller/userController');
const { CreateTask,DeleteTask,UpdateTask,GetTask } = require('../Controller/taskController');
const router = express.Router();


router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);
router.get('/signOut', signOut);
router.get('/tasks/:id',verifyToken,getUserTasks)

router.post('/create', verifyToken, CreateTask);
router.delete('/delete/:id',verifyToken,DeleteTask);
router.post('/update/:id',verifyToken,UpdateTask);
router.get('/getTask/:id',GetTask);
router.post('/updateTask/:id',verifyToken,UpdateTask);



module.exports = router;