const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('tiny')); //this means using this middleware first and then goes to the next handler
//app.use 


//defining our own middleware and chaining it



app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query; // the query in this context is the url
    if (password === 'chickennugget') {
        next();
    }
    res.send("YOU NEED A PASSWORD!")
}


// app.use((req, res, next) => { // the default template for chaining the next middleware
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next(); //adding return to make sure that everything in the function run
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()")
// })
// //they will run in order up to down
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!")
//     return next();
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWARE!!!")
//     return next();
// })



app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})
//instead of using app.use we can add this function directly in the app.get function
app.get('/secret', verifyPassword, (req, res) => {// multiple call back funtions can be pass into this get method
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})
app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})