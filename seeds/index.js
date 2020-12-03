const mongoose = require('mongoose');
const Campground = require('../models/campgrounds')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/camp', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
})

const radnomNumFromArray = array => Math.floor(Math.random() * array.length);

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 100; i++){
        const randomCityNum = radnomNumFromArray(cities);
        var loc = cities[randomCityNum].fields.ascii_name
        loc = loc.replace(/'/g, '');  //remove appearance of '
        const c = new Campground({
            title: `${descriptors[radnomNumFromArray(descriptors)]} ${places[radnomNumFromArray(places)]}`,
            location: loc, 
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices vestibulum lacus ac commodo. Nulla vitae dictum nisi. Suspendisse potenti. Quisque justo odio, malesuada sit amet ligula in, ullamcorper varius justo",
            price: Math.floor(Math.random() * 20) + 10,
            author: '5fbd5a8ad3574a26345230ae',
            images: [
                {
                  url: 'https://res.cloudinary.com/dv7v6nvfa/image/upload/v1606661066/YelpCamp/u14gburnekukqcoqslpx.jpg',
                  filename: 'YelpCamp/u14gburnekukqcoqslpx'
                },
                {
                  url: 'https://res.cloudinary.com/dv7v6nvfa/image/upload/v1606661066/YelpCamp/qelbhjitjmhppwpmq32i.jpg',
                  filename: 'YelpCamp/qelbhjitjmhppwpmq32i'
                }
              ],
              geometry: {...cities[randomCityNum].geometry}

        });
        await c.save();
    }
   
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("closed db");
});