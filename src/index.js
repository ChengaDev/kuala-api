const express = require('express');
const userRouter = require('./routers/user');
const educationRouter = require('./routers/education');
require('./db/mongooseConfig');

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(educationRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
