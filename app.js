const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog');

//connect to  mongodb
const dbURI = 'mongodb+srv://hritik:01478@nodetut.eaeh7.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewurlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use((morgan('dev')));
app.use(express.static('public'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})
app.get('/single-blog', (req, res) => {
    Blog.findById('62a45fa319bc2172eb481397')
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})
//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Hritik: wahi ladka jo urmila se ghumta tha', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex ab hic! Aliquam ab tempora in adipisci eos cumque, error odit laudantium sed obcaecati. Quam alias, vel perferendis nisi, dignissimos quod illum odit esse dolorem et impedit omnis. Eos, aliquam?' },
        { title: 'Lazy Avnit', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex ab hic! Aliquam ab tempora in adipisci eos cumque, error odit laudantium sed obcaecati. Quam alias, vel perferendis nisi, dignissimos quod illum odit esse dolorem et impedit omnis. Eos, aliquam?' },
        { title: 'Brijesh the Ashiq', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ex ab hic! Aliquam ab tempora in adipisci eos cumque, error odit laudantium sed obcaecati. Quam alias, vel perferendis nisi, dignissimos quod illum odit esse dolorem et impedit omnis. Eos, aliquam?' }
    ]
    res.render('index', { title: "Home", blogs });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => console.log(err));
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new blog" });
})

app.use((req, res) => {
    res.status(404).render('404', { titile: "404" });
})