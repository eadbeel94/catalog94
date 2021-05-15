const router = require("express").Router();  
const passport = require('passport');
const m= require('dayjs');
const bcrypt = require('bcrypt');

const { User } = require('../config/schema.js');
//---------------------------------- READ ARTICLE ----------------------------------//

router.post('/signIn', async (req,res)=>{
  console.log( 20 , 'sign In' );
  let status= true;
  let data= [];
  let mess= "";
  try {
    const client = await User.findOne({account: req.body.name}).select('account password');
    if(client != null){
      status= await bcrypt.compare(req.body.pass, client.password);
      data= client.account;
    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 45,err )   };
  res.json({ status, data , mess });
});

router.post('/addUser', async (req,res)=>{
  console.log( 20 , 'add User' );
  let status= true;
  let data= [];
  let mess= "";
  try {
    if(req.body){
      const { account, fullname, pass , rpass }= req.body;
      if( pass != rpass ){
        status= false;
        mess= "Password doesn't match";
      }
      if( pass == rpass ){
        const salt = await bcrypt.genSalt(10);  
        const password = await bcrypt.hash(pass, salt);
        const date = m().unix();
        const newUser = new User({ account, fullname, password, date }); 
        await newUser.save();
        status= true;
      }

    }
  } catch (err) { status= false;  mess= err.message || String( err ); console.log( 45,err )   };
  res.json({ status, data , mess });
});

router.post('/signIn2', function(req, res, next) {
  console.log( 45 , 'signIn2' );
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      return res.json({ 
        status: false , 
        data: [] , 
        mess: info.message 
      }); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ 
        status: true, 
        data: user.account, 
        mess: info.message 
      }); 
    });
  })(req, res, next);
});

module.exports = router;