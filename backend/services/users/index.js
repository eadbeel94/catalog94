/** @namespace service/user */

const bcrypt = require('bcrypt');
const m= require('dayjs');
const { GroupUser }= require('./store.js');

/**
 * Call methods to modify values into collection user
 * @const {class} store
 * @memberof service/user
 */
const store= new GroupUser();

module.exports= {
  /**
   * Check if password is correct, then encrypt password and save into database
   * @function addOneElement
   * @memberof service/user
   * @param {object} cont include all user data information
   */
  addOneElement: async ( cont ) => {
    const { fullname, account: user, password: pass, confirm } = cont;
    if( pass.length >= 3 && confirm.length >= 3 && pass === confirm ){
      const account= user.toUpperCase();
      const salt = await bcrypt.genSalt(10);  
      const password = await bcrypt.hash(pass, salt);
      const date = m().format();
      await store.addOne({ fullname, account, password, date });
    }else
      throw new Error(`Password doesn't match`);
  },
};