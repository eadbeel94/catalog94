/** @namespace model/schemas */

const { Schema, model } = require('mongoose'); 

/** 
 * Mongodb schema with all vehicle's params
 * @const {schema} vehicleSchema
 * @memberof model/schemas
 */
const vehicleSchema = new Schema({
  vin:   { type: String, required: true , unique: true },
  name:  { type: String },
  manuf: { type: String },
  model: { type: String },
  type:  { type: String },
  fuel:  { type: String },
  color: { type: String },
  datec: { type: String },
  datem: { type: String },
});

/** 
 * Mongodb schema with all user's params 
 * @const {schema} userSchema
 * @memberof model/schemas
 */
const userSchema = new Schema({
  account: { type: String, required: true , unique: true },
  fullname: { type: String },
  password: { type: String, required: true },
  date: { type: String }
})

module.exports.Vehicle = model('vehicle', vehicleSchema);
module.exports.User = model('users', userSchema);