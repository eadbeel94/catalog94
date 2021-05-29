/** @namespace route/api */

const { readdirSync }= require('fs');
const { join }= require('path');

/**
 * Get all files with name network.js from services folder
 * @const {array} routerList
 * @memberof route/api
 */
const routerList= readdirSync( join(__dirname , '../services') )
                    .map( el=> [ el , `../services/${el}/network.js` ] );


/**
 * include all routes into services folder and adapt to server
 * @function routerLink
 * @param {any} server Express server
 * @memberof route/api
 */
function routerLink( server ){
  routerList.forEach( route=>{
    server.use( `/api/${route[0]}` , require( route[1] ) );
  });
};

module.exports= routerLink;