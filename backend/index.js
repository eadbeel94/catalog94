const express = require('express'); 
//const path= require('path');   
const cors= require('cors');
//------------------------------------- Inicialize -------------------------------------//                     
process.env.NODE_ENV !== 'production' && require('dotenv').config();
require('./config/database.js');

const app = express();   
app.set('port',process.env.PORT || 3001);  
//------------------------------------- Middleware -------------------------------------//         
app.use(express.json());    
app.use(cors());
//------------------------------------- Call routes -------------------------------------//
app.use('/api/vehicle/', require('./routes/items.js'));
app.use('/api/types/', require('./routes/types.js'));
//app.use('/api/', require('./routes/main.js'));
//------------------------------------- Static files -------------------------------------//
//app.use(express.static(path.join(__dirname, './public/'))); 
//------------------------------------- Start server -------------------------------------//
app.listen( app.get('port'), ()=> console.log(`Server on port ${app.get('port')}`) );