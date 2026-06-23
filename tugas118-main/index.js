const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
const noteRoutes = require('./routes/Routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});