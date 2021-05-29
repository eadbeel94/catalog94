const { Vehicle }= require('../../model/main.js');

/** 
 * CRUD operation to change values into user collection
 * @memberof service/user
 **/
class StoreVehicle{
  /** constructor not used */
  constructor(){

  };
  /**
   * Save new user
   * @param {object} group object with all user's fields
   */
  async getAll(){
    try {
      return await Promise.all([
        Vehicle.find().sort({ color: 1 }).select('color').distinct('color'),
        Vehicle.find().sort({ fuel: 1 } ).select('fuel' ).distinct('fuel' ),
        Vehicle.find().sort({ manuf: 1 }).select('manuf').distinct('manuf'),
        Vehicle.find().sort({ type: 1 } ).select('type' ).distinct('type' )
      ]);
    } catch (error) {   throw error   };
  };

};

module.exports= { StoreVehicle };