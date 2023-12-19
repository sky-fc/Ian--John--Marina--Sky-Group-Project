require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const sequelize = require('./config/sequelize.config');
const app = express();

//... Endpoints for the login and registration

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });
});