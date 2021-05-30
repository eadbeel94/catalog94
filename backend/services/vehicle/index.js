/** @namespace service/vehicle */

const { vehicle: automobile }= require('faker');
const { StoreVehicle }= require('./store.js');
const { join }= require('path');
const XLSX= require('xlsx');
const m= require('dayjs');
/*m.extend(require('dayjs/plugin/localizedFormat'));
m.extend(require('dayjs/plugin/relativeTime'));*/

/**
 * Call methods to modify values into collection recipe
 * @const {class} store
 * @memberof service/recipe
 */
const store= new StoreVehicle();

module.exports= {

  /**
   * Return all vehicles based on keyword give by client
   * @function searchElements
   * @memberof service/vehicle
   * @param {string} keyword special word what generate a search in db
   * @param {object} filt group elements that use to complex query
   * @param {string} page number page
   * @returns {array<object>} All vehicles in an object's array
   */
  searchElements: async ( keyword , filt , page ) => {
    const skip= (Number(page) * 20);
    const filters= { $or: [] };

    filters[`$or`].push({ manuf: { $regex: keyword } });
    filters[`$or`].push({ fuel: { $regex: keyword } });
    filters[`$or`].push({ vin: { $regex: keyword } });

    if( filt ){
      const found= Boolean(Object.entries( filt ).map( el => el[1].length > 0 ).filter( el=> el )[0]);
      if(found)
        Object.entries( filt ).forEach( el=> el[1].length > 1 && (filters[el[0]]= el[1]) );
    };
    return await store.searchSome( filters , skip , 20 );
  },
  /**
   * Return a vehicle using a specific vin code
   * @function getOneElement
   * @memberof service/vehicle
   * @param {string} vin vehicle code id
   * @returns {object} Return all fields from vehicle
   */
  getOneElement: async ( vin ) => {
    const value= await store.getOne( vin );
    if( !value ) throw new Error(`Element with vin -> ${vin} Doesn't exist`);
    return value;
  },
  /**
   * Add a new vehicle into database
   * @function addOneElement
   * @memberof service/vehicle
   * @param {object} cont include all vehicle's fields
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
   * Edit a specific vehicle
   * @function editOneElement
   * @memberof service/vehicle
   * @param {string} vehicleID vehicle code id
   * @param {object} cont include all recipe fields
   */
  editOneElement: async ( vehicleID, cont ) => {

    const data= { ...cont,  datem: m().unix()  };
    const exist= await store.editOne( vehicleID, data );
    if( !exist ) throw new Error(`Element with ID -> ${vehicleID} Doesn't exist`);
  },
  /**
   * Erase a specific vehicle
   * @function delOneElement
   * @memberof service/vehicle
   * @param {string} vehicleID vehicle code id
   */
  delOneElement: async ( vehicleID  ) => {
    const exist= await store.delOne( vehicleID );
    if( !exist )  throw new Error(`Element with ID -> ${vehicleID} Doesn't exist`);
  },
  /**
   * Generate a random vehicle values
   * @function genOneRandom
   * @memberof service/vehicle
   * @returns {object} Return all fileds from vehicle
   */
  genOneRandom: async () => {
    const { vehicle, manufacturer, model, type, fuel, vin, color }= automobile;
    return {
      vin:   vin(),
      name:  vehicle(),
      manuf: manufacturer(),
      model: model(),
      type:  type(),
      fuel:  fuel(),
      color: color()
    };
  }, 

  getAllElemens: async ()=>{
    //const rows= [];
    let vehicles= await store.getAll();

    vehicles= vehicles.map( car => {
      return {
        vin:    car.vin,
        name:   car.name,
        manuf:  car.manuf,
        model:  car.model,
        type:   car.type,
        fuel:   car.fuel,
        color:  car.color
      }
    });

    vehicles= [ {
      vin:   "Vehicle ID",
      name:  "Vehicle name",
      manuf: "Manufacturer", 
      model: "Model",
      type:  "Vehicle Type",
      fuel:  "Fuel Type",
      color: "Color"
    } , ...vehicles ];

    const wb = XLSX.utils.book_new();
    const ws= XLSX.utils.json_to_sheet( vehicles, { header: ['vin','name','manuf','model','type','fuel','color'] , skipHeader: true } );
    XLSX.utils.book_append_sheet(wb, ws, "Backup");
    const fullpath= join( __dirname , '../../tmp/' , `Catalog-94_${ m().unix() }.xlsx` );

    await XLSX.writeFile( wb , fullpath )

    return fullpath;
  },
};