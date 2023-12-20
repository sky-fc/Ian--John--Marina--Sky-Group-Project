require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize.config');
const userRoutes = require('./routes/User.routes');
const app = express();
//.. updated version with User.routes.js holds the login and registration
app.use(cors());
app.use(express.json());


app.use('/users', userRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});
