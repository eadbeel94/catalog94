/** @namespace service/recipe */

const { StoreVehicle }= require('./store.js');
//const { Types: { ObjectId } } = require('mongoose');

/**
 * Call methods to modify values into collection recipe
 * @const {class} store
 * @memberof service/recipe
 */
const store= new StoreVehicle();


const m= require('dayjs');
/*
m.extend(require('dayjs/plugin/localizedFormat'));
m.extend(require('dayjs/plugin/relativeTime'));
*/

module.exports= {

  /**
   * Return all recipes whit same user id
   * @function getAllElements
   * @memberof service/recipe
   * @param {string} userID user identificator
   * @returns {array<object>} All recipes in an object's array
   */
  searchElements: async ( keyword , filt , page ) => {
    const skip= (Number(page) * 20);
    const filters= { $or: [] };
    //const objID= new ObjectId(keyword);

    filters[`$or`].push({ manuf: { $regex: keyword } });
    filters[`$or`].push({ fuel: { $regex: keyword } });
    filters[`$or`].push({ vin: { $regex: keyword } });
    //filters[`$or`].push({ '_id': objID });

    if( filt ){
      const found= Boolean(Object.entries( filt ).map( el => el[1].length > 0 ).filter( el=> el )[0]);
      if(found)
        Object.entries( filt ).forEach( el=> el[1].length > 1 && (filters[el[0]]= el[1]) );
    };
    return await store.searchSome( filters , skip , 20 );
  },
  /**
   * Return a recipe using a specific user and recipe id
   * @function getOneElement
   * @memberof service/recipe
   * @param {string} recipeID recipe identificator
   * @param {string} userID user identificator
   * @returns {object} Return all fields from recipe
   */
  getOneElement: async ( vin ) => {
    const value= await store.getOne( vin );
    if( !value ) throw new Error(`Element with vin -> ${vin} Doesn't exist`);
    return value;
  },
  /**
   * Add a new recipe into database
   * @function addOneElement
   * @memberof service/recipe
   * @param {object} cont include all recipe fields
   * @param {string} userID user identificator
   */
  addOneElement: async ( cont ) => {
    const date=  m().unix();
    const data= { 
      ...cont , 
      datem: date,
      datec: date
    };
    await store.addOne( data );
  },
  /**
   * Edit a specific recipe
   * @function editOneElement
   * @memberof service/recipe
   * @param {string} recipeID recipe identificator
   * @param {object} cont include all recipe fields
   * @param {string} userID user identificator
   */
  editOneElement: async ( vehicleID, cont ) => {

    const data= { ...cont,  datem: m().unix()  };
    const exist= await store.editOne( vehicleID, data );
    if( !exist ) throw new Error(`Element with ID -> ${vehicleID} Doesn't exist`);
  },
  /**
   * Erase a specific recipe
   * @function delOneElement
   * @memberof service/recipe
   * @param {string} recipeID recipe identificator
   * @param {string} userID user identificator
   */
  delOneElement: async ( vehicleID  ) => {
    const exist= await store.delOne( vehicleID );
    if( !exist )  throw new Error(`Element with ID -> ${vehicleID} Doesn't exist`);
  },
};