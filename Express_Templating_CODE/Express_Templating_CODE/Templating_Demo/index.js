const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json'); //takes the "reddit" data.json file

app.use(express.static(path.join(__dirname, 'public')))  // if we want to serve css, htmls, js files 'public' since the name is public

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))// we change the working directory so that it works outside of the folder of index
// path and directory 




app.get('/', (req, res) => {
    res.render('home') //res.render will render the the ejs fie
})

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num })
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})