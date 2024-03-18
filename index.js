const express = require('express');
// executing express
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

// using ejs to template
app.set('view engine', 'ejs');
// makes it possible for index.js file to find views folder whereever it is located
app.set('views', path.join(__dirname, '/views'));

// home route
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
})

// server connection
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})