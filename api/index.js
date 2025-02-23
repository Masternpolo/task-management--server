const express = require('express');
const app = express();
const cors = require('cors')
// const cookieParser = require('cookie-parser')
const port = 3000;
require('dotenv').config();


const userRoutes = require('../routes/user.route');

// app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'https://task-manager-steel-pi.vercel.app',
    // origin: 'http://127.0.0.1:5500',

    credentials: true // Allow cookies and other credentials
}));


app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);







app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

