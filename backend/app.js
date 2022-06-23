const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');

const errorMiddleware = require('./middlewares/errors');

// Setting up config file
if (process.env.NODE_ENV === 'PRODUCTION')
  require('dotenv').config({ path: 'backend/config/config.env' });
dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');
const blog = require('./routes/blog');
const faq = require('./routes/faq');

const commentRout = require('./routes/commentRouter');
const playerProfile = require('./routes/TournamentRoutes/payerRouter');
const tournament = require('./routes/TournamentRoutes/tournamentRoute');
const notification = require('./routes/notificationRouter');
const teams = require('./routes/TournamentRoutes/teamRouter');
const schedule = require('./routes/TournamentRoutes/scheduleRoute');
const ining = require('./routes/TournamentRoutes/iningRoute');
// Products Routes
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', payment);
app.use('/api/v1', order);
app.use('/api/v1', blog);
app.use('/api/v1', faq);

app.use('/api/v1', notification);
app.use('/api/v1', commentRout);
//Tournaments
app.use('/api/v1', playerProfile);
app.use('/api/v1', tournament);
app.use('/api/v1', teams);
app.use('/api/v1', schedule);
app.use('/api/v1', ining);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
