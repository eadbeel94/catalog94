const { Vehicle }= require('../../model/main.js');

/** 
 * CRUD operation to change values into vehicle collection
 * @memberof service/vehicle
 **/
class StoreVehicle{
  /** constructor not used */
  constructor(){};
  /**
   * Get all vehicles based on query
   * @param {string} filters complex query
   * @param {number} skip qty elements skiped
   * @param {number} limit qty elements get from db
   * @returns {array<object>} All vehicles
   */ 
  async searchSome( filters , skip , limit ){
    try {
      return await Vehicle.find(filters).skip(skip).limit(limit).select('fuel manuf model name type vin');
    } catch (error) { throw error };
  };
  /**
   * Get a vehicle using a vin code
   * @param {string} vin vehicle id code
   * @returns {object} if exist get recipe
   */
  async getOne( vin ){
    try {
      return await Vehicle.findOne({ vin }); 
    } catch (error) { throw error };
  };
  /**
   * Save new vehicle
   * @param {object} group object with all vehicle's fields
   */
  async addOne(group){
    try {
      const newVehicle= new Vehicle(group);
      await newVehicle.save();
    } catch (error) { throw error };
  };
  /**
   * Edit a vehicle using vehicle mongo ID
   * @param {string} elementID 
   * @param {object} group 
   * @returns {object} Vehicle edited
   */
  async editOne( elementID , group ){
    try {
      return await Vehicle.findByIdAndUpdate( elementID , group );
    } catch (error) { throw error };
  };
  /**
   * Delete a vehicle using vehicle mongo ID
   * @param {string} elementID 
   * @returns {object} Recipe deleted
   */
  async delOne( elementID ){
    try {
      return await Vehicle.findByIdAndDelete( elementID );
    } catch (error) { throw error };
  };

  async getAll(){
    try {
      return await Vehicle.find();
    } catch (error) { throw error };
  }
};

module.exports= { StoreVehicle };