const getError= ( error ) => {
  let message= "Error: ";
  if( typeof error === 'object' && error !== null ){
    message+= error.hasOwnProperty('message') ? error.message : JSON.stringify( error );
  }else message+= String(error);
  return message;
};

const fetchSend= async( url="" , type="" , send )=>{

  let stat= false;
  let data= {};
  let mess= "";
  try {
    const config= { method: type || "GET" };
    data && ( config.body= JSON.stringify(send) );
    data && ( config.headers= { 'Content-Type': 'application/json'  }  );

    const res= await fetch( url, config );
    const json= await res.json();

    if( !res.ok )       throw { status: res.status ,  message: `${ res.statusText }`  };
    if( !json.status )  throw { status: json.status , message: `${ json.mess }`       };

    stat= json.status;
    data= json.data;
    mess= "";

  } catch (err) { 

    stat= false; 
    data= {};
    mess= getError(err);
    
  };

  return { stat , data , mess };
};

const porcentual= ( dayM , createD, targetD ) =>{
  const alltime = dayM(targetD).diff( dayM(createD) );
  const curtime = dayM(targetD).diff( dayM() );
  
  let value= 0;
  if( curtime/alltime >= 1 || 0 >= curtime/alltime ) value= 100;
  else if( 1 > curtime/alltime )  value= (100 - curtime/alltime * 100);
  return value
};

const splitRows= ( oldList=[] , columns=3 )=>{
  const orgList= [...oldList];
  const maxCol= oldList.length / 3;
  const newList= new Array(columns);

  for (let i = 0; i < columns - 1; i++) newList[i]= orgList.splice(0, maxCol) ;
  newList[ columns - 1 ]= orgList;

  return newList;
};

module.exports= { getError , fetchSend , porcentual , splitRows }