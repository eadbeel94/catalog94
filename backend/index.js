const express= require('express');
const session= require('express-session');            //Use express-session feartures
const passport= require('passport');                  //Use passport local authentification methods
const boom= require('@hapi/boom');
const cors= require('cors');
const { join }= require('path');

//--------------------------- Config options ---------------------------
const app= express();

if( process.env.NODE_ENV !== 'production' ) require('dotenv').config();
require('./model/connection.js');
require('./utils/auth/passport.js');

const { DEBUG , PORT }= require('./utils/config.js');

if( DEBUG ) console.log= require('debug')('app:log');
if( DEBUG ) console.error= require('debug')('app:error ->');

app.set('PORT' , PORT );

//--------------------------- Global middlewares ---------------------------
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(session({                                     //Inicialize session
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 11 }    //Keep session value for 2 minutes
}));
app.use(passport.initialize());                       //Inicialize passport
app.use(passport.session());                          //Inicialize session

//--------------------------- Routes ---------------------------
require('./routes/apiRoutes.js')(app);

//--------------------------- Static files ---------------------------
app.use('/static', express.static(    join(__dirname, '../build/static')   ));
app.get('*', (req, res) => {
  res.sendFile('index.html', {  root: join(__dirname, '../build/')  } );
});
//--------------------------- Errors ---------------------------

app.use( function( req , res , next ) {
  if( !req.accepts('html') || req.xhr ){
    const {
      output: { statusCode, payload }
    } = boom.notFound(); 
    res.status( statusCode ).json( payload );
  }else
    res.status(404).send("404");
});

const { logError, wrapError , cliErrorHandler, errorHandler }= require('./utils/middlewares/errorHandler.js');
app.use( logError );
app.use( wrapError );
app.use( cliErrorHandler );
app.use( errorHandler );

//--------------------------- Initialize server ---------------------------
app.listen( app.get('PORT') , ()=> console.log(`Server on port ${ app.get('PORT') }`) );