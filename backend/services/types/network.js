/** @namespace route/user */

const { Router }= require('express');
const router= Router();

const { getAllElemets }= require('./index.js');

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
router.get('/getAll' , async (req,res,next)=>{
  try {
    const data= await getAllElemets();
    res.json({ data , mess: "" });
  } catch (error) {   next(error);    };
});

module.exports= router;