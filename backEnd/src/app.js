require('dotenv').config();
require('../config/config_passport');
const express = require('express');
const app = express();
require('../DB_connection/DB_connection');
const cors = require('cors');
const session = require('express-session');
const router = require('../routes/AuthRoutes');
const passport = require('passport');

app.use(cors({
  origin:"http://localhost:5173",
  methods:"GET,POST,PUT,DELETE",
  credentials: true,
})
);
app.use(session({
  secret:"hcuiasgdcv12h321g2e91",
  resave:false,
  saveUninitialized:true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
    sameSite: 'lax',
    httpOnly: true,
    secure: false, 
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth',router);

app.get('/',(req,res)=>{
  res.send("helllo world");
})

app.get('/dashbord',(req,res)=>{
  res.send("this is a dash bord");
  console.log()
})
app.listen(process.env.PORT,()=>{
  console.log("listing at port number ",process.env.PORT);
})