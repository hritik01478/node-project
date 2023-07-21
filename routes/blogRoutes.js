// const express = require('express');
// const blogController = require('../controllers/blogControllers');

import express from 'express';
// import blogController from '../controllers/blogControllers.js';
import {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
} from '../controllers/blogControllers.js';
const router = express.Router();

router.get('/', blog_index);

router.post('/', blog_create_post);

router.get('/create', blog_create_get);

router.get('/:id', blog_details);

router.delete('/:id', blog_delete);


// module.exports = router;
export default router