const { User }= require('../../model/main.js');

/** 
 * CRUD operation to change values into user collection
 * @memberof service/user
 **/
class StoreUser{
  /** constructor not used */
  constructor(){};
  /**
   * Save new user
   * @param {object} group object with all user's fields
   */
  async addOne(group){
    try {
      const newUser= new User(group);
      await newUser.save();
    } catch (error) {   throw error   };
  };

};

module.exports= { StoreUser };