import express from 'express';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// db models
require('./models/Image');
require('./models/Queue');
require('./models/Rating');
require('./models/User');

let url = process.env.MONGO_URL || 'mongodb://localhost:27017/rank';
const mongoose = require('mongoose');
mongoose.connect(url);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// api endpoints
app.use('/image', require('./api/image'));
app.use('/rate', require('./api/rate'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const isProduction = process.env.NODE_ENV === 'production';

// error handlers for app
// error format: { message } as the body returned
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {},
    });
  });
}

const port = 1717;
app.listen(port, async () => {
  console.log(`Blog app listening on ${port}`);
});
