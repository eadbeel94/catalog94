/** @namespace route/user */

const { Router }= require('express');
const router= Router();

const { getAllElemets }= require('./index.js');

/**
 * Get all vehicle's types
 *
 * @name addOne
 * @path {POST} /api/types/getAll
 * @body {object} user Include all user fields  
 * @response {object} data All element's types
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