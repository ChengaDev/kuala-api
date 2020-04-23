var cors = require('cors');
const express = require('express');
const userRouter = require('./routers/user');
const educationRouter = require('./routers/education');
const projectRouter = require('./routers/project');
require('./db/mongooseConfig');

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(educationRouter);
app.use(projectRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
