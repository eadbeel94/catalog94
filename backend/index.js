const express= require('express');
const boom= require('@hapi/boom');
const cors= require('cors');
const { join }= require('path');

//--------------------------- Config options ---------------------------
const app= express();

if( process.env.NODE_ENV !== 'production' ) require('dotenv').config();
require('./model/connection.js');

const { DEBUG , PORT }= require('./utils/config.js');

if( DEBUG ) console.log= require('debug')('app:log');
if( DEBUG ) console.error= require('debug')('app:error ->');

app.set('PORT' , PORT );

//--------------------------- Global middlewares ---------------------------
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

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
    res.status(404).redirect("/404");
});

const { logError, wrapError , cliErrorHandler, errorHandler }= require('./utils/middlewares/errorHandler.js');
app.use( logError );
app.use( wrapError );
app.use( cliErrorHandler );
app.use( errorHandler );

//--------------------------- Initialize server ---------------------------
app.listen( app.get('PORT') , ()=> console.log(`Server on port ${ app.get('PORT') }`) );