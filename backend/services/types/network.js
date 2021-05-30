/** @namespace route/type */

const { Router }= require('express');
const router= Router();

const { getAllElemets }= require('./index.js');

/**
 * Get all distinct vehicle's types
 *
 * @name getAll
 * @path {GET} /api/types/getAll
 * @response {object} data All element's types
 * @response {string} mess contain status message
 * @memberof route/type
 */
router.get('/getAll' , async (req,res,next)=>{
  try {
    const data= await getAllElemets();
    res.json({ data , mess: "" });
  } catch (error) {   next(error);    };
});

module.exports= router;