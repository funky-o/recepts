const express = require('express');
const dataRoutes = require('./routes/data');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected.'))
  .catch((error) => console.log(error))

app.use(morgan('dev')); // красивое логирование запросов
app.use(bodyParser.urlencoded({extended: true})); // для разбора json
app.use(bodyParser.json()); // для генерации js объектов из json
app.use(cors()); // подключаем обработку cors запросов

app.use('/api/data', dataRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'index.html'
      )
    )
  });
}

module.exports = app;