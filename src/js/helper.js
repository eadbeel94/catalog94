/** @namespace view/helper */

/**
 * Create a messase based on error object
 * @function
 * @memberof view/helper
 * @param {Error} error Object type error 
 * @returns {string} code error
 */
export const getError= ( error ) => {
  let message= "";
  if( typeof error === 'object' && error !== null ){
    message+= error.hasOwnProperty('message') ? error.message : JSON.stringify( error );
  }else message+= String(error);
  return message;
};

/**
 * Send command fetch and process response information
 * @function
 * @memberof view/helper
 * @param {string} url endpoint address 
 * @param {string} type can use "GET", "POST" , "PUT" or "DELETE"
 * @param {object|any} send information group send to backend
 * @returns {Promise<{ stat: boolean , data: any , mess: string , noauth: boolean }>} response status, information returned, message error if exist it and auth status
 */
export const fetchSend= async( url="" , type="" , send )=>{

  /** 
   * URL endpoint
   * @const {string} IP
   * @memberof view/helper
   */
  const IP= process.env.NODE_ENV !== 'production' ? `http://localhost:3001/api` : `/api`

  /** 
  * End state after process endopoint response
  * @type {boolean}
  * @memberof view/helper
  */
  let stat= false;
  /** 
  * If user not logged succesfully, this value will be false
  * @type {boolean}
  * @memberof view/helper
  */
  let noauth;
  /** 
  * Group information got from server
  * @type {object}
  * @memberof view/helper
  */
  let data= {};
  /** 
   * status detail message
   * @type {string}
   * @memberof view/helper
   */
  let mess= "";

  try {
    const config= { method: type || "GET" };
    config.headers= { 'X-Requested-With': 'XMLHttpRequest' };
    send && ( config.body= JSON.stringify(send) );
    send && ( config.headers= { ...config.headers , 'Content-Type': 'application/json'  }  );

    const res= await fetch( IP + url, config );
    const json= await res.json();

    if( res.status === 511 ) noauth= true;
    if( !res.ok ) throw new Error(`${ json.stack ? json.stack.split('\n')[0] : json.error }`);

    data= json.data;
    mess= json.mess;
    stat= true;
  } catch (err) { 
    stat= false; 
    mess= getError(err);
  };

  return { stat , data , mess , noauth };
};
/**
 * Create three rows based on first row
 * @function
 * @memberof view/helper
 * @param {Array<object>} oldList First array with group information
 * @param {number} columns quantity to split the first array
 * @returns { Array } Return an array that incle n arrays
 */
export const splitRows= ( oldList=[] , columns=3 )=>{
  const orgList= [...oldList];
  const maxCol= oldList.length / 3;
  const newList= new Array(columns);

  for (let i = 0; i < columns - 1; i++) newList[i]= orgList.splice(0, maxCol) ;
  newList[ columns - 1 ]= orgList;

  return newList;
};
/**
 * Create a string base on column name and code list value
 * @function
 * @memberof view/helper
 * @param {number} col column number
 * @param {string} list position list value
 * @returns {string} new name column
 */
export const genGroup= ( col=0, list="" )=> {
  let newcol;
  switch (col) {
    case 1:   newcol= "B"; break;
    case 2:   newcol= "C"; break;
    default:  newcol= "A"; break;
  }
  return `${newcol}${list} ->`;
};