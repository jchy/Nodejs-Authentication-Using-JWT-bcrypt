const express = require('express');
const userRouter = express.Router();
const protect = require('../middlewares/protect')
const { getAllUsers} = require('../controllers/user.controller')

userRouter.get("/users",protect,getAllUsers);

module.exports = userRouter;