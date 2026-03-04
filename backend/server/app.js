require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const collegRouter = require('../route.js/college');
const app = express();

port = process.env.PORT || 8080;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/college",collegRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
