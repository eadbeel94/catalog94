/** @namespace service/type */

const { StoreVehicle }= require('./store.js');

/**
 * Call methods to modify values into collection vehicle
 * @const {class} store
 * @memberof service/type
 */
const store= new StoreVehicle();

module.exports= {
  /**
   * Get all vehicle's types
   * @function getAllElemets
   * @memberof service/type
   */
  getAllElemets: async () => await store.getAll(),
};