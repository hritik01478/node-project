// const { render } = require('ejs');
// const express = require('express');
// const { default: mongoose } = require('mongoose');
// const morgan = require('morgan');
// const Blog = require('./models/blog');
// const blogRoutes = require('./routes/blogRoutes');

// app.js

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { render } from 'ejs';
import Blog from './models/blog.js';
import blogRoutes from './routes/blogRoutes.js';
import path from 'path';

// Your Express app setup and configuration code goes here


//connect to  mongodb
const dbURI = 'mongodb+srv://hritik:hritik01478@cluster0.huy2guw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewurlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.set('views', path.join(__dirname, 'views'));

//middleware and static files
app.use((morgan('dev')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//mongoose and mongo sandbox routes

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
})