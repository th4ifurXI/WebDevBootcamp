
if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./malaysianCities');
const images = require('./images')
const { places, descriptors } = require('./seedHelpersMy');
const Campground = require('../models/campground');
const dbURL = process.env.DB_URL;


mongoose.connect(dbURL, {
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 115; i++) {
        const random1000 = i;
        const random16 = Math.floor(Math.random() * 16);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '6852a986f7fedf04b4c3afe5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,cities[random1000].latitude ]
            },
            images: images[random16],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})