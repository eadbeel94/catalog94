const { connect } = require('mongoose');                              //Call mongoose module for create connection with mongodb

connect('mongodb://localhost:27017/mobilecatalog',{                       //Call connect method with URI and configuration             
    useNewUrlParser: true,                                          
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then( db => db && console.log('DB connected') )
  .catch( err => err && console.log('error',err.message) );
  