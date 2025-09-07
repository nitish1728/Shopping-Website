const path=require('path')
const cors=require('cors')
const express=require('express')
const app=express()
require('dotenv').config({ debug: true })
const PORT=process.env.PORT||3000
const mongoose=require('mongoose')
const cloudinary=require('./config/img_conn')
const Product=require('./model/product')
const multer=require('multer')
const connectDB=require('./config/conn')
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser')

connectDB()

app.use(cookieParser())

app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/product',require('./routes/Product'))
app.use('/register',require('./routes/register'))
app.use('/login',require('./routes/login'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))
app.use('/fetchAuth',require('./routes/fetchAuth'))
app.use('/authProduct',require('./routes/loggedinProduct'))

mongoose.connection.once('open',()=>{
    console.log('Database connected Successfully')
    app.listen(PORT,()=>{
        console.log(`Server listening on PORT ${PORT}`)
    })
});


