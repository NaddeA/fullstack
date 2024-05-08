const express = require('express');
const authRoutes = require('./Authen/authroutes');
const mongoose = require('mongoose');
const passport = require('./passport');
const session = require('express-session');
const app = express();

//we need template engine to render the pages
app.set('view engine', 'ejs');
//Start with the middleware(for URL encode and to parse JSON string)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Need secret key for the session, here we make sure that the data isn't saved multiple times if the
//for same request of the page. Use cookie to store the session id.No need to save session everytime
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

//named the database eventmaster
mongoose.connect('mongodb://localhost/eventmaster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Server started on http://localhost:${PORT} `));

