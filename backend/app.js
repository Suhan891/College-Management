require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const collegRouter = require('./routes/college');
const commonRouter = require('./routes/common');
const courseRouter = require('./routes/course');
const departmentRouter = require('./routes/department');
const streamRouter = require('./routes/stream');
const studentRouter = require('./routes/student');
const teacherRouter = require('./routes/teacher');
const classRouter = require('./routes/class')
const subjectRouter = require("./routes/subject")

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors()); 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/college", collegRouter);
app.use("/",commonRouter)
app.use("/course", courseRouter);
app.use("/department", departmentRouter);
app.use("/stream", streamRouter);
app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)
app.use("/class", classRouter)
app.use("/subject",subjectRouter)

app.get('/', (req, res) => {
    res.send('Student Management API is running...');
});

// Basic Error Handler
app.use((err, req, res, next) => {
    console.log("Exact error", {err})
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

