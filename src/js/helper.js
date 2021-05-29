/** @namespace js/helper */

/**
 * Create a messase based on error object
 * @function
 * @memberof js/helper
 * @param {Error} error Object type error 
 * @returns {string} code error
 */
const getError= ( error ) => {
  let message= "";
  if( typeof error === 'object' && error !== null ){
    message+= error.hasOwnProperty('message') ? error.message : JSON.stringify( error );
  }else message+= String(error);
  return message;
};
/**
 * Send command fetch and process response information
 * @function
 * @memberof js/helper
 * @param {string} url endpoint address 
 * @param {string} type can use "GET", "POST" , "PUT" or "DELETE"
 * @param {object|any} send information group send to backend
 * @returns {{ stat , data , mess }} response status, information returned and message error if exist it
 */
const fetchSend= async( url="" , type="" , send )=>{

  let stat= false;
  let data= {};
  let mess= "";
  try {
    const config= { method: type || "GET" };
    config.headers= { 'X-Requested-With': 'XMLHttpRequest' };
    send && ( config.body= JSON.stringify(send) );
    send && ( config.headers= { ...config.headers , 'Content-Type': 'application/json'  }  );

    const res= await fetch( url, config );
    const json= await res.json();

    if( !res.ok ) throw { status: res.status ,  message: `${ json.stack ? json.stack.split('\n')[0] : json.error }`  };
    //if( !json.status )  throw { status: json.status , message: `${ json.mess }`       };

    data= json.data;
    mess= json.mess;
    stat= true;
  } catch (err) { 
    stat= false; 
    mess= getError(err);
  };

  return { stat , data , mess };
};
/**
 * Create three rows based on first row
 * @function
 * @memberof js/helper
 * @param {Array<object>} oldList First array with group information
 * @param {number} columns quantity to split the first array
 * @returns { Array } Return an array that incle n arrays
 */
const splitRows= ( oldList=[] , columns=3 )=>{
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
 * @memberof js/helper
 * @param {number} col column number
 * @param {string} list position list value
 * @returns {string} new name column
 */
const genGroup= ( col=0, list="" )=> {
  let newcol;
  switch (col) {
    case 1:   newcol= "B"; break;
    case 2:   newcol= "C"; break;
    default:  newcol= "A"; break;
  }
  return `${newcol}${list} ->`;
};

module.exports= { getError , fetchSend , splitRows , genGroup };