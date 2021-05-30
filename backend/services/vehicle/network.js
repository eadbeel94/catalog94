/** @namespace route/vehicle */

const { Router }= require('express');
const router= Router();

const fs= require('fs');
const valid= require('../../utils/middlewares/validHandler.js');

//const { NOT_AUTH , TEST_ID }= require('../../utils/config.js');
const { checkLogged } = require('../../utils/middlewares/authHandler.js');
const { 
  vehicleNewSchema, 
  vehicleEditSchema, 
  vehicleIdSchema, 
  vehicleVinSchema 
}= require('../../utils/schema/validSchema.js');


const { 
  searchElements,
  getOneElement,
  addOneElement,
  editOneElement,
  delOneElement,
  genOneRandom,
  getAllElemens
}= require('./index.js');

/**
 * Get all Vehicles using a specific word, use middleware to check log in status
 *
 * @name getAll
 * @path {GET} /api/vehicle/getAll
 * @body {object} get text(string), filter(object) , page(number) from client
 * @response {object} data contain all vehicles
 * @response {string} mess contain status message
 * @memberof route/vehicle
 */
router.post('/search' , async (req,res,next)=>{
  try {
    const { text , filters , page }= req.body;
    const data= await searchElements( text , filters, page );
    
    res.json({ data , mess: data.length > 0 ? "Search found" : "Elements not found" });
  } catch (error) {   next(error);    };
});
/**
 * Get all Vehicles using a specific vin, use middleware to check log in status and validation form
 *
 * @name getOne
 * @path {GET} /api/vehicle/getOne
 * @params {string} :vin vehicle Identificator
 * @response {object} data contain the vehicle
 * @response {string} mess contain status message
 * @memberof route/vehicle
 */
router.get('/getOne/:vin' , valid(vehicleVinSchema) , async (req,res,next)=>{
  try {
    const { vin }= req.params;

    const data= await getOneElement( vin );
    res.json({ data , mess: "Get one element successfully" });
  } catch (error) {   next(error);    };
});
/**
 * Save a vehicle into database, use middleware to check log in status and validation form
 *
 * @name addOne
 * @path {POST} /api/vehicle/addOne
 * @body {object} vehicle Include all vehicle fields  
 * @response {object} data contain all vehicles
 * @response {string} mess contain status message
 * @memberof route/vehicle
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
 * Edit a vehicle into database, use middleware to check log in status and validation form
 *
 * @name editOne
 * @path {PUT} /api/vehicle/editOne
 * @params {string} :id vehicle mongo db Identificator
 * @body {object} vehicle Include all vehicle's fields  
 * @response {object} data
 * @response {string} mess contain status message
 * @memberof route/vehicle
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
 * Delete a vehicle into database, use middleware to check log in status and validation form
 *
 * @name delOne
 * @path {DELETE} /api/vehicle/delOne
 * @params {string} :id vehicle mongodb Identificator
 * @response {object} data
 * @response {string} mess contain status message
 * @memberof route/vehicle
 */
router.delete('/deleteOne/:id' , checkLogged , valid( vehicleIdSchema , "params" ) , async (req,res,next)=>{
  try {
    const { id: vehicleID }= req.params;

    await delOneElement( vehicleID );
    res.json({ data: true , mess: "Delete one element successfully" });
  } catch (error) {   next(error);    };
});

/**
 * Get a random vehicle using faker library, use middleware to check log in status
 *
 * @name getRandom
 * @path {GET} /api/vehicle/getRandom
 * @response {object} data contain the vehicle
 * @response {string} mess contain status message
 * @memberof route/vehicle
 */
router.get('/getRandom' , checkLogged , async (req,res,next)=>{
  try {
    const data= await genOneRandom();
    res.json({ data , mess: "Get one Random element successfully" });
  } catch (error) {   next(error);    };
});

/**
 * Get all Vehicles and convert a excel file, use middleware to check log in status
 *
 * @name download
 * @path {GET} /api/vehicle/download
 * @memberof route/vehicle
 */
router.get('/download' , checkLogged , async (req,res,next)=>{
  try {
    const filename= await getAllElemens();
    res.download(filename , err =>{
      if(err) next(err)
      else    fs.unlinkSync( filename );
    });
  } catch (error) {   next(error);    };
});

module.exports= router;