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

connectDB()

app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true
}));

app.use('/product',require('./routes/Product'))

mongoose.connection.once('open',()=>{
    console.log('Database connected Successfully')
    app.listen(PORT,()=>{
        console.log(`Server listening on PORT ${PORT}`)
    })
});


