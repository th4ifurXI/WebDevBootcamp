const { PI, square } = require('./math'); // must have ./ math in a directory

const cats = require('./shelter')
// console.log(PI)

// console.log(square(9))
//although the module is inside another package, we can have a new library
// console.log("REQUIRED AN ENTIRE DIRECTORY!", cats)
const dadJokes = require('dad-jokes');
dadJokes.random()
//creating modules for usage
