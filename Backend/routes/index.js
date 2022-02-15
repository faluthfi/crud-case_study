//import express
const express =require('express');
const router=express.Router();

//import router
const apiKey=require('./apiKey');
const todo=require('./todo');
const auth=require('./auth');

//routes list
router.use('/api-key',apiKey);
router.use('/todo',todo);
router.use('/auth',auth);

module.exports=router;
