const express=require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const xss = require('xss');
const cookieParser = require('cookie-parser');
const signin = require('./controllers/signin');
const profilex = require('./controllers/profilex');
const withAdmin = require('./controllers/withAdmin');
const quickRegister = require('./controllers/quickRegister');
const register = require('./controllers/register');
const verify = require('./controllers/verify');
const campusAss = require('./controllers/campusAss');
const contact = require('./controllers/contact');
const withAuth = require('./middleware');
const resetPass = require('./controllers/resetPass');
const lost = require('./controllers/lost');
const eventReg = require('./controllers/eventReg');
const eventRegCancel = require('./controllers/eventRegCancel');
const callback = require('./controllers/callback');
const eventPayment = require('./controllers/eventPayment');
const doubleVerify = require('./controllers/doubleVerify');
const payments = require('./controllers/payments');
const eventRegList = require('./controllers/eventRegList');
const getUsers = require('./controllers/getUsers');
const easter = require('./controllers/easter');
require("dotenv").config();

const db = knex({
  client: 'mysql',
  connection: {
  	// connectionString: process.env.DATABASE_URL,
  	// ssl: true
    host : 'infotsav.in',
    user : 'infotsav',
    password : 'tukki@123',
    database : 'infotsav'
  }
});

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/api', (req,res)=>{ res.send('it is working')});
app.post('/api/register', (req,res)=> {register.handleRegister(req, res, db, bcrypt, xss)});
app.post('/api/quickRegister', (req,res)=> {quickRegister.handleQuickRegister(req, res, db, bcrypt, xss)});
app.post('/api/verify', (req,res)=>{verify.handleVerifyRequest(req, res, db)});
app.post('/api/callback', (req,res)=>{callback.handleCallback(req, res, db)});
app.get('/api/callback', (req,res)=>{callback.handleCallback(req, res, db)});
app.post('/api/dverify', (req,res)=>{doubleVerify.handleDverify(req, res, db)});
app.post('/api/eventPayment', (req,res)=>{eventPayment.handleEventPayment(req, res, db)});
app.post('/api/signin', (req,res)=> {signin.handleSignin(req, res, db, bcrypt, xss)});
app.post('/api/contact', (req,res)=> {contact.handleContact(req, res, db, xss)});
app.post('/api/campusAss', (req,res)=> {campusAss.handleCampusAss(req, res, db, xss)});
app.post('/api/resetPassReq', (req,res)=>{resetPass.handleResetPassReq(req, res, db, xss)});
app.post('/api/resetPassRes', (req,res)=>{resetPass.handleResetPassRes(req, res, db, bcrypt)});
app.post('/api/resetPassInit', (req,res)=>{resetPass.handleResetPassInit(req, res, db, bcrypt)});
app.post('/api/eventReg', withAuth, (req,res)=>{eventReg.handleEventReg(req, res, db, xss)});
app.post('/api/eventRegCancel', withAuth, (req,res)=>{eventRegCancel.handleEventRegCancel(req, res, db, xss)});
app.post('/api/easterRedeem', withAuth, (req,res)=>{easter.handleEasterRedeem(req, res, db, xss)});
app.post('/api/easterScore', (req,res)=>{easter.fetchScore(req, res, db)});
app.post('/api/lost', (req,res)=>{lost.handleLostUpdate(req, res, db)});
app.get('/api/logout', (req, res) => {res.clearCookie('token'); res.status(301).redirect('/login');});
app.get('/api/profilex', withAuth, (req, res) => {profilex.handleProfile(req, res, db)});
app.get('/api/payments', withAdmin, (req, res) => {payments.returnPayments(req, res, db)});
app.get('/api/getusers', withAdmin, (req, res) => {getUsers.returnUsers(req, res, db)});
app.post('/api/eventRegList', (req, res) => {eventRegList.eventRegList(req, res, db)});
app.get('/api/checkAdmin', withAdmin, (req, res) => {
  res.sendStatus(200);
});
app.get('/api/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

// app.get('/api/*', (req,res) => {res.status(404).redirect('https://www.infotsav.in/404')});

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
	console.log(`We are on on port ${PORT}!`);
})
