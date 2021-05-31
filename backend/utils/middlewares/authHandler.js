/** @namespace util/middleware/auth */

const boom= require('@hapi/boom');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const { User }= require('../../model/main.js');
const { SECRET }= require('../../utils/config.js');

const genBoomError= ( message="" , code=500 )=>{
  const error = boom.badRequest(message);
  error.output.statusCode = code;
  error.reformat();
  error.output.payload.custom = message;
  return error;
}

/**
 * Middleware that verify auth user and send a jwt to client
 * @function authHandler
 * @memberof util/middleware/auth
 * @param {object} req server req object
 * @param {object} res server res object
 * @param {function} next server next object
 * @returns {function} return next() method 
 */
async function authHandler(req,res,next){
  const { username, password }= req.body;

  let client;
  const newUser = username.toUpperCase();
  if(username)
    client = await User.findOne({ account: newUser || '' });

  if(!client)
    return next(genBoomError('User not found'));
  else{
    const match = await bcrypt.compare(password, client.password);
    if(!match)
      return next(genBoomError('Password not correct'));
    else{
      const token= jwt.sign( { id: client._id }, SECRET , {
        expiresIn: 60 * 60 * 24
      });
      res.json({ data: token , mess: client.fullname.toUpperCase() });
    }
  }
};

/**
 * Middleware that evualuate auth status
 * @function
 * @memberof util/middleware/auth
 * @param {object} req server req object
 * @param {object} res server res object
 * @param {function} next server next object
 * @returns {function} return next method 
 */
async function checkLogged(req, res, next) {

  const token= req.headers['x-access-token'];
  if(!token) return next( genBoomError('No token provided' , 511) );

  try {
    const { id }= jwt.verify(token,SECRET);
    const found= await User.findById(id).distinct('_id');
    if(!found) return next( genBoomError('Not user found',511) );
  } catch (error) {
    return next( genBoomError(error.message + " You must sign in again" ,511) );
  }
  return next();
};

module.exports= { authHandler , checkLogged };