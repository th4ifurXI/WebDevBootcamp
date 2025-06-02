const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');



app.use(methodOverride('_method'));
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
// app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let comments = [
    {
        id : uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id : uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id : uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id : uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments/new' , (req,res) => {
    res.render('comments/new' );
})

app.post('/comments' , (req , res) => {
    const {username, comment } = req.body;
    comments.push({username, comment, id});
    res.redirect('/comments' );
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id); // or parseInt(id) if id is a number
    if (comment) {
        res.render('comments/show', { comment });
    } else {
        res.send('Comment not found!');
    }
});


app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})


app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    //create new array that does not have the id and use it as the new one.
    res.redirect('/comments');
})

app.get('/comments' , (req,res) => {
    res.render('comments/index' , {comments} );

})

app.get('/tacos' , (req,res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req,res) => {
    const {meat, qty} = req.body;
    res.send(`POST /tacos response. here is what you submitted: ${meat}, ${qty}`);
})



app.listen(3000,() => {
    console.log("Tunrned On PORT 3000")
}) 