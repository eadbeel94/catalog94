/** @namespace model/schemas */

const { Schema, model } = require('mongoose'); 

/** 
 * Mongodb schema with all vehicle's params
 * @const {schema} vehicleSchema
 * @memberof model/schemas
 */
const vehicleSchema = new Schema({                           //Creo una tabla de nombre UserSchema
  vin:   { type: String, required: true , unique: true },  //CENTER
  name:  { type: String },  //STORAGE
  manuf: { type: String },  //#OEM
  model: { type: String },  //DESC
  type:  { type: String },  //OEM
  fuel:  { type: String },  //COST
  color: { type: String },  //TYPE
  datec: { type: String }, //DATE EDITED
  datem: { type: String }, //DATE EDITED
});

/** 
 * Mongodb schema with all user params 
 * @const {schema} userSchema
 * @memberof model/schemas
 */
const userSchema = new Schema({
  account: { type: String, required: true , unique: true },                 //Creo una columna llamada name
  fullname: { type: String },
  password: { type: String, required: true },             //Creo una columna llamada password
  date: { type: String }
})

module.exports.Vehicle = model('vehicle', vehicleSchema);
module.exports.User = model('users', userSchema);