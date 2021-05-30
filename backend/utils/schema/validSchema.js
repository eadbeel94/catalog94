/** @namespace util/schemas */

const Joi= require('joi');

/**
 * Using joi structure, create a validator for ID mongo db values
 * @type {Object}
 * @constant vehicleIdSchema
 * @property {string} id Check if exist 24 hexadecimal positions 
 * @memberof util/schemas
 */
const vehicleIdSchema= Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
});
/**
 * Using joi structure, create a validator for vin vehicle
 * @type {Object}
 * @constant vehicleVinSchema
 * @property {string} vin Check if exist 17 alphabetic values 
 * @memberof util/schemas
 */
 const vehicleVinSchema= Joi.object({
  vin: Joi.string().regex(/^[0-9a-zA-Z]{17}$/)
});
/**
 * Using joi structure, create a validator for each field into form recipe
 * @type {Object}
 * @constant vehicleNewSchema
 * @property {string} vin  evaluate that string contain 17 alphanumeric and alphabetic character
 * @property {string} name  evaluate that string contain more 50 between 3 characters
 * @property {string} manuf evaluate that string contain more 50 between 3 characters
 * @property {string} model evaluate that string contain more 50 between 3 characters
 * @property {string} type  evaluate that string contain more 50 between 3 characters
 * @property {string} fuel  evaluate that string contain more 50 between 3 characters
 * @property {string} color evaluate that string contain more 50 between 3 characters
 * @property {string} datec evaluate that string contain more 3 character
 * @property {string} datem evaluate that string contain more 3 character
 * @memberof util/schemas
 */
const vehicleNewSchema= Joi.object({
  vin:  Joi.string().regex(/^[0-9a-zA-Z]{17}$/).required(),
  name: Joi.string().min(3),
  manuf: Joi.string().min(3).max(50),
  model: Joi.string().min(3).max(50),
  type:  Joi.string().min(3).max(50),
  fuel:  Joi.string().min(3).max(50),
  color: Joi.string().min(3).max(50),
  datec: Joi.string().min(3),
  datem: Joi.string().min(3),
});
/**
 * Using joi structure, create a validator for each field into form recipe
 * @type {Object}
 * @constant vehicleEditSchema
 * @property {string} name  evaluate that string contain more 100 between 3 characters
 * @property {string} manuf evaluate that string contain more 100 between 3 characters
 * @property {string} model evaluate that string contain more 100 between 3 characters
 * @property {string} type  evaluate that string contain more 100 between 3 characters
 * @property {string} fuel  evaluate that string contain more 100 between 3 characters
 * @property {string} color evaluate that string contain more 100 between 3 characters
 * @property {string} datec evaluate that string contain more 3 character
 * @property {string} datem evaluate that string contain more 3 character
 * @memberof util/schemas
 */
 const vehicleEditSchema= Joi.object({
  name: Joi.string().min(3),
  manuf: Joi.string().min(3).max(50),
  model: Joi.string().min(3).max(50),
  type:  Joi.string().min(3).max(50),
  fuel:  Joi.string().min(3).max(50),
  color: Joi.string().min(3).max(50),
  datec: Joi.string().min(3),
  datem: Joi.string().min(3),
});
/**
 * Using joi structure, create a validator for each field into form user
 * @type {Object}
 * @constant userNewSchema
 * @property {string} fullname evaluate that value is a string
 * @property {string} account evaluate that value is a string
 * @property {string} password evaluate that string contain more 3 character
 * @property {string} confirm evaluate that string contain more 3 character
 * @memberof util/schemas
 */
const userNewSchema= Joi.object({
  fullname: Joi.string(),
  account: Joi.string(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirm:  Joi.ref('password')
}).with('password', 'confirm');

module.exports= {
  vehicleIdSchema,
  vehicleVinSchema,
  vehicleNewSchema,
  vehicleEditSchema,
  userNewSchema
};