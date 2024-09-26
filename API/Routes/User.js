const express = require('express');
const { signUp, signIn,signOut } = require('../Controller/userController');
const { verifyToken } = require('../utils/verifyUser');
const{google} = require('../Controller/authController');
const { taskListing,getListing, updateListing, deleteListing, changeStatus } = require('../Controller/taskController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', google);
router.get('/signOut', signOut);
module.exports = router;
//
router.post('/create', verifyToken, taskListing);
router.get('/:id', verifyToken, getListing);
router.put('/update/:id', verifyToken, updateListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.put('/status/:id', verifyToken, changeStatus);
