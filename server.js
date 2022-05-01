const express = require('express')
const app = express()
const connect = require('./src/config/db')
const userRouter = require('./src/routes/user.route');
const authRouter = require('./src/routes/auth.route');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/",userRouter);
app.use("/",authRouter);

const start = async() => {
    await connect();
    app.listen(PORT,()=>{
        console.log(`listening on port ${PORT}`)
    })
}

module.exports = start;