const mongoose =require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground= require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for( let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*20) +10;
        const camp =new Campground({
            author: '6203db2a861b291c663fd4f1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consecutor adispcaing sed laboure ispum a cum nihil atque molestiae deserunt!',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            price: price,
            image: [
                {
                    url: 'https://res.cloudinary.com/dcvv0ahtk/image/upload/v1644670347/YelpCamp/uyiec6awzlvw7vkldn5d.jpg',
                    filename: 'YelpCamp/t95lp8jrfqfzv8ilxxtg',
                  },
                  {
                    url: 'https://res.cloudinary.com/dcvv0ahtk/image/upload/v1644670347/YelpCamp/uyiec6awzlvw7vkldn5d.jpg',
                    filename: 'YelpCamp/jxb5qtyzsaowmxhere33',
                  },
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})