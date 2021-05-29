const { Vehicle }= require('../../model/main.js');

/** 
 * CRUD operation to change values into recipe collection
 * @memberof service/recipe
 **/
class StoreVehicle{
  /** constructor not used */
  constructor(){

  };
  /**
   * Get all recipes using a same userID
   * @param {string} userID 
   * @returns {array<object>} All recipes
   */ 
  async searchSome( filters , skip , limit ){
    try {
      return await Vehicle.find(filters).skip(skip).limit(limit).select('fuel manuf model name type vin');
    } catch (error) { throw error };
  };
  /**
   * Get a recipe using a recipe ID
   * @param {string} elementID 
   * @param {string} userID 
   * @returns {object} if exist get recipe
   */
  async getOne( vin ){
    try {
      return await Vehicle.findOne({ vin }); 
    } catch (error) { throw error };
  };
  /**
   * Save new recipe
   * @param {object} group object with all recipe's fields
   */
  async addOne(group){
    try {
      const newVehicle= new Vehicle(group);
      await newVehicle.save();
    } catch (error) { throw error };
  };
  /**
   * Edit a recipe using recipe ID
   * @param {string} elementID 
   * @param {object} group 
   * @returns {object} Recipe edited
   */
  async editOne( elementID , group ){
    try {
      return await Vehicle.findByIdAndUpdate( elementID , group );
    } catch (error) { throw error };
  };
  /**
   * Delete a recipe using recipe ID
   * @param {string} elementID 
   * @returns {object} Recipe deleted
   */
  async delOne( elementID ){
    try {
      return await Vehicle.findByIdAndDelete( elementID );
    } catch (error) { throw error };
  };
  /**
   * Check if recipe is own user ID
   * @param {string} elementID 
   * @param {string} userID 
   * @returns {object} recipeID
   */
  async validOne ( elementID , userID ){
    try {
      return await Vehicle.findOne({ _id: elementID, userID }).select('_id');
    } catch (error) { throw error };
  };
};

module.exports= { StoreVehicle };