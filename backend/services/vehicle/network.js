/** @namespace route/recipe */

const { Router }= require('express');
const router= Router();


const valid= require('../../utils/middlewares/validHandler.js');

const { NOT_AUTH , TEST_ID }= require('../../utils/config.js');
const { checkLogged } = require('../../utils/middlewares/authHandler.js');
const { vehicleNewSchema , vehicleEditSchema , vehicleIdSchema , vehicleVinSchema }= require('../../utils/schema/validSchema.js');


const { 
  searchElements,
  getOneElement,
  addOneElement,
  editOneElement,
  delOneElement
}= require('./index.js');

/**
 * Get all Recipes using a specific user ID, use middleware to check log in status
 *
 * @name getAll
 * @path {GET} /api/recipes/getAll
 * @response {object} data contain group of recipes and log gin feedback status
 * @response {string} mess contain status message
 * @memberof route/recipe
 */
router.post('/search' , async (req,res,next)=>{
  try {
    const { text , filters , page }= req.body;
    const data= await searchElements( text , filters, page );
    
    res.json({ data , mess: data.length > 0 ? "Search found" : "Elements not found" });
  } catch (error) {   next(error);    };
});
/**
 * Get all Recipes using a specific user ID and recipe ID, use middleware to check log in status and validation form
 *
 * @name getOne
 * @path {GET} /api/recipes/getOne
 * @params {string} :id recipe Identificator
 * @response {object} data contain the recipe
 * @response {string} mess contain status message
 * @memberof route/recipe
 */
router.get('/getOne/:vin' , valid(vehicleVinSchema) , async (req,res,next)=>{
  try {
    const { vin }= req.params;

    const data= await getOneElement( vin );
    res.json({ data , mess: "Get one element successfully" });
  } catch (error) {   next(error);    };
});
/**
 * Save a recipe into database, use middleware to check log in status and validation form
 *
 * @name addOne
 * @path {POST} /api/recipes/addOne
 * @body {object} recipe Include all recipe fields  
 * @response {object} data contain all recipes
 * @response {string} mess contain status message
 * @memberof route/recipe
 */
router.post('/addOne' , checkLogged , valid( vehicleNewSchema ) , async (req,res,next)=>{
  try {
    const { body: vehicle }= req;

    //let userID= "";
    //if( session.passport )  userID= session.passport.user.id;
    //if( NOT_AUTH )          userID= TEST_ID;

    await addOneElement( vehicle );
    //const data= await getAllElements(userID);
    res.json({ data: true , mess: "Add one element successfully" });
  } catch (error) {   next(error);    };
});
/**
 * Edit a recipe into database, use middleware to check log in status and validation form
 *
 * @name editOne
 * @path {PUT} /api/recipes/editOne
 * @params {string} :id recipe Identificator
 * @body {object} recipe Include all recipe fields  
 * @response {object} data
 * @response {string} mess contain status message
 * @memberof route/recipe
 */
router.put('/editOne/:id', 
  checkLogged,
  valid( vehicleIdSchema , "params" ), 
  valid(vehicleEditSchema),
  async (req,res,next)=>{
    try {
      const { id: vehicleID }= req.params;
      const { body: vehicle }= req;

     // let userID= "";
      //if( session.passport )  userID= session.passport.user.id;
     // if( NOT_AUTH )          userID= TEST_ID;

      await editOneElement( vehicleID, vehicle );
      res.json({ data: true , mess: "Edit One elements successfully" });
    } catch (error) {   next(error);    };
  }
);
/**
 * Delete a recipe into database, use middleware to check log in status and validation form
 *
 * @name delOne
 * @path {DELETE} /api/recipes/delOne
 * @params {string} :id recipe Identificator
 * @response {object} data
 * @response {string} mess contain status message
 * @memberof route/recipe
 */
router.delete('/deleteOne/:id' , checkLogged , valid( vehicleIdSchema , "params" ) , async (req,res,next)=>{
  try {
    const { id: vehicleID }= req.params;

    await delOneElement( vehicleID );
    res.json({ data: true , mess: "Delete one element successfully" });
  } catch (error) {   next(error);    };
});


module.exports= router;