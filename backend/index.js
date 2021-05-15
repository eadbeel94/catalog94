const express = require('express'); 

const session= require('express-session');
const passport= require('passport');  
const cors= require('cors');
//------------------------------------- Inicialize -------------------------------------//                     
process.env.NODE_ENV !== 'production' && require('dotenv').config();
require('./config/database.js');
require('./config/passport.js');  

const app = express();   
app.set('port',process.env.PORT || 3001);  
//------------------------------------- Middleware -------------------------------------//         
app.use(express.json());    
app.use(cors());
app.use(session({                                     //Inicialize session
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 2 }    //Keep session value for 2 minutes
}));
app.use(passport.initialize());                       //Inicialize passport
app.use(passport.session());                          //Inicialize session
//------------------------------------- Call routes -------------------------------------//
app.use('/api/vehicle/', require('./routes/items.js'));
app.use('/api/types/', require('./routes/types.js'));
app.use('/api/login/', require('./routes/login.js'));
//------------------------------------- Static files -------------------------------------//
//app.use(express.static(path.join(__dirname, './public/'))); 
//------------------------------------- Start server -------------------------------------//
app.listen( app.get('port'), ()=> console.log(`Server on port ${app.get('port')}`) );