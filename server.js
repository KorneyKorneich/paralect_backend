const express = require('express');
const config = require('config');
const mongoose = require('mongoose').default;
const vacancyRouter = require("./routes/vacancy.routes")
const corsMiddleware = require('./middleware/cors.middleware')
 
const port = config.get('server');;
const app = express();

app.use(express.json());
app.use(corsMiddleware);
console.log('Starting server setup...');
app.use('/api/', vacancyRouter);
console.log('Route setup complete.');

const start = async () => {
  try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(config.get("dbURL"));
      console.log('Connected to MongoDB');
      app.listen(port, () => {
          console.log(`Server started at port ${port}`);
      });
  } catch (e) {
      console.error('Error starting the server:', e);
  }
};

start();