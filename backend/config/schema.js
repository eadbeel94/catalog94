const { Schema, model } = require('mongoose');              //Call methods schema and model from mongoose for create tables that after
//------------------------------------- Product schema -------------------------------------//
const commonschema = new Schema({                           //Creo una tabla de nombre UserSchema
  vin:   { type: String, unique: true },  //CENTER
  name:  { type: String },  //STORAGE
  manuf: { type: String },  //#OEM
  model: { type: String },  //DESC
  type:  { type: String },  //OEM
  fuel:  { type: String },  //COST
  color: { type: String },  //TYPE
  datec: { type: String }, //DATE EDITED
  datem: { type: String }, //DATE EDITED
});


const uchema = new Schema({                           //Creo una tabla de nombre UserSchema
  account: { type: String, required: true },                 //Creo una columna llamada name
  fullname: { type: String },
  password: { type: String, required: true },             //Creo una columna llamada password
  date: { type: String }
});

//------------------------------------- Export Schemas -------------------------------------//
module.exports.Vehicle = model('vehicle',commonschema);
module.exports.User = model('users',uchema);