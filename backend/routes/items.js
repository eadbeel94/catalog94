const { Router }= require('express');
const router= Router();

const m= require('dayjs');

const { Vehicle }= require('../config/schema.js');

router.post('/search', async (req,res)=>{
  console.log( 10 , 'search' , req.body.page );
  let status= true;
  let data= [];
  let mess= "";
  try {
    const maxLength= req.body.text.length || 0;
    if( req.body && maxLength >= 2 ){
      const skip= (Number(req.body.page) * 20);
      const filters= { $or: [] };
      filters[`$or`].push({ manuf: { $regex: req.body.text } });
      filters[`$or`].push({ fuel: { $regex: req.body.text } });

      if( req.body.hasOwnProperty('filters') ){
        const found= Boolean(Object.entries( req.body.filters ).map( el => el[1].length > 0 ).filter( el=> el )[0]);
        if(found)
          Object.entries( req.body.filters ).forEach( el=> el[1].length > 1 && (filters[el[0]]= el[1]) );
      }
      data= await Vehicle.find(filters).skip(skip).limit(20).select('fuel manuf model name type vin');

      if( 0 >= data.length) throw {  message: `article not found`  };
    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 30,err ); };
  res.json({ status, data , mess });
});

router.get('/getOne', async (req,res)=>{
  console.log( 35 , 'get one' , req.query );
  let status= true;
  let data= [];
  let mess= "";
  try {
    if( req.query.vin ){
      const info= await Vehicle.findOne({ vin: req.query.vin }); 
      data= info;
      status= true;
    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 45,err ); };
  res.json({ status, data , mess });
});

router.post('/addOne', async (req,res)=>{
  console.log( 50 , 'add one' );
  let status= true;
  let data= [];
  let mess= "";
  try {
    if( req.body ){
      const newCar= new Vehicle({
        vin:  req.body.vin,
        name:  req.body.name,
        manuf: req.body.manuf,
        model: req.body.model,
        type:  req.body.type,
        fuel:  req.body.fuel,
        color: req.body.color,
        datec: m().unix(),
        datem: m().unix()
      });
      await newCar.save();
      status= true;
    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 70,err ); };
  res.json({ status, data , mess });
});

router.put('/editOne', async (req,res)=>{
  console.log( 75 , 'edit one' , req.query.id );
  let status= true;
  let data= [];
  let mess= "";
  try {
    if( req.query.id && req.body ){
      await Vehicle.findByIdAndUpdate(req.query.id,{
        vin:  req.body.vin,
        name:  req.body.name,
        manuf: req.body.manuf,
        model: req.body.model,
        type:  req.body.type,
        fuel:  req.body.fuel,
        color: req.body.color,
        datec: m().unix(),
        datem: m().unix()
      });
      status= true;
    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 95,err ); };
  res.json({ status, data , mess });
});

router.delete('/deleteOne', async (req,res)=>{
  console.log( 100 , 'delete one' , req.query.id );
  let status= true;
  let data= [];
  let mess= "";
  try {
    if( req.query.id ){
      await Vehicle.findByIdAndDelete(req.query.id);
      status= true;
    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 110,err ); };
  res.json({ status, data , mess });
});

module.exports = router;


(async()=>{
  /*
  const { vehicle: Car , date: Dategen }= require('faker');
  const m= require('dayjs');

  const cars= [];
  const genCar= ()=>{
    const { vehicle, manufacturer, model, type, fuel, vin, color }= Car;
    return {
      vin:   vin(),
      name:  vehicle(),
      manuf: manufacturer(),
      model: model(),
      type:  type(),
      fuel:  fuel(),
      color: color(),
      datec: Dategen.recent(),
      datem: Dategen.recent()
    };
  };
  for (let i = 0; i < 70; i++) cars.push( genCar() );
  */

  //await Vehicle.insertMany( cars );
  //console.log('end')
})();
