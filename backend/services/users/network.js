/** @namespace route/user */

const { Router }= require('express');
const router= Router();

const valid= require('../../utils/middlewares/validHandler.js');
const { authHandler , checkLogged } = require('../../utils/middlewares/authHandler.js');
const { addOneElement }= require('./index.js');
const { userNewSchema }= require('../../utils/schema/validSchema.js');

/**
 * Save a new user into database, use middleware validation form
 *
 * @name addOne
 * @path {POST} /api/users/addOne
 * @body {object} user Include all user fields  
 * @response {object} data
 * @response {string} mess contain status message
 * @memberof route/user
 */
router.post('/addOne' , checkLogged , valid( userNewSchema ) , async (req,res,next)=>{
  try {
    const { body: user }= req;
    await addOneElement( user );
    res.json({ data: true , mess: "Add one element successfully" });
  } catch (error) {   next(error);    };
});
/**
 * Verify credential user, use middleware authHandler
 *
 * @name auth
 * @path {POST} /api/users/auth
 * @auth This route requires Authentication. If authentication fails it redirect main page with error message
 * @response {object} data contain user name 
 * @response {string} mess contain status message
 * @memberof route/user
 */
router.post("/auth" , authHandler );

module.exports= router;