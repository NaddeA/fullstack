require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authroutes');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));

const app = express();


//we need template engine to render the pages
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Need secret key for the session, here we make sure that the data isn't saved multiple times if the
//for same request of the page. Use cookie to store the session id.No need to save session everytime
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.log(err));

app.use('/events', eventRoutes);
app.use('/user', authRoutes);

app.get('/all-events', (req, res) => {
    res.render('all_event');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Server started on http://localhost:${PORT} `));

