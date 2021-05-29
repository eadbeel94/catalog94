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
   * Check if password is correct, then encrypt password and save into database
   * @function addOneElement
   * @memberof service/type
   * @param {object} cont include all user data information
   */
  getAllElemets: async () => await store.getAll(),
};