const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');
const authJwt = require('./helpers/jwt');

const api= process.env.API_URL;

//Routes
const calculRouter = require('./routes/calcul');
const eventRouter = require('./routes/event');
const donateRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const errorHandler= require('./helpers/error-handler')
const feedbacksRouter= require('./routes/feedbacks')

//middleware

app.use(bodyParser.json());
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));



app.use(`${api}/calcul`, calculRouter);
app.use(`${api}/event`, eventRouter);
app.use(`${api}/donate`, donateRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/feedbacks`, feedbacksRouter);




mongoose.connect('mongodb://localhost:27017/zakat')
.then(() => {
    console.log('DB connection is ready...');
})
.catch(err => {
    console.log(err);
})





app.listen(3000, () => {
    console.log(api);
    console.log('Server is running on port 3000');
});