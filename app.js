if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const path = require("path");
const session = require('express-session')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const engine = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');


const Campground = require('./models/campgrounds');
const Review = require('./models/review');
const User = require('./models/user');

const userRoutes = require('./routes/users.js')
const campgroundRoutes = require('./routes/campgrounds.js')
const reviewRoutes = require('./routes/reviews.js');

const MongoDBStore = require("connect-mongo")(session);

//const Product = require('./models/product')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/camp';
//connection to the camp database=
mongoose.connect(dbUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false}); 
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));

app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

app.use(express.urlencoded({extended: true})) //parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.static(path.join(__dirname, 'public')));  //serve static files such as images, CSS files, and JavaScript files
app.use(methodOverride('_method'));

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //security reasons
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}
app.use(session(sessionConfig));  //gives a session to every use that connects (e.g cookie with id)
app.use(flash());
app.use(helmet());

//for helmet
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com",
    "https://api.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://kit.fontawesome.com",
    "https://cdnjs.cloudflare.com",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com",
    "https://stackpath.bootstrapcdn.com",
    "https://api.mapbox.com",
    "https://api.tiles.mapbox.com",
    "https://fonts.googleapis.com",
    "https://use.fontawesome.com",
];
const connectSrcUrls = [
    "https://api.mapbox.com",
    "https://*.tiles.mapbox.com",
    "https://events.mapbox.com",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            childSrc: ["blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dv7v6nvfa/",
                "https://images.unsplash.com",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());  //will make the user stay logged in after the login
passport.use(new LocalStrategy(User.authenticate()));  // User.authenticate is a static method provided by passport-local-mongoose

passport.serializeUser(User.serializeUser());   // User.serializeUser is a static method provided by passport-local-mongoose
passport.deserializeUser(User.deserializeUser());   // User.deserializeUser is a static method provided by passport-local-mongoose


app.use((req, res, next) => {   
    res.locals.currentUser = req.user //its a filed from passport, now on every template we'll have accsess to req.user if the user is logged in   
    // middleware: on every request check if there is a req.flash with index success and pass it to the ress
    res.locals.success = req.flash('success'); //if there is a flash with key success - we would be able to access it in the boilerplate, if we'll refresh it will no longer be accessible
    res.locals.error = req.flash('error');
    next();
})

//set up routes
app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes); //middleware: every request that starts with /campgrounds send to the campgrounds router
app.use("/campgrounds/:id/reviews", reviewRoutes); //middleware: every request that starts with /campgrounds send to the reviews router
 
app.get('/', (req, res) => {
    res.render('home')
});

app.all('*', (req,res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message){
        err.message = 'Oh No, Something Went Wrong'
    }
    res.status(statusCode).render('error', {err});
});

const port = process.env.PORT || 3000;
app.listen(port, function() { 
  console.log(`Serving on port ${port}`); 
});



