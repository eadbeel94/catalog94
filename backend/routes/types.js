const { Router }= require('express');
const router= Router();

const { Vehicle }= require('../config/schema.js');

router.get('/getAll', async (req,res)=>{
  console.log( 10 , 'get all types requested' );
  let status= true;
  let data= [];
  let mess= "";
  try {
    const info= await Promise.all([
      Vehicle.find().sort({ color: 1 }).select('color').distinct('color'),
      Vehicle.find().sort({ fuel: 1 } ).select('fuel' ).distinct('fuel' ),
      Vehicle.find().sort({ manuf: 1 }).select('manuf').distinct('manuf'),
      Vehicle.find().sort({ type: 1 } ).select('type' ).distinct('type' )
    ])
    data= info;
    status= true;
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 15,err )   };
  res.json({ status, data , mess });
});

module.exports = router;

(async()=>{

})();
