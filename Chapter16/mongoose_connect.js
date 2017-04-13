/**
 * Created by Administrator on 2017-04-13.
 */
var mongoose = require('mongoose');
mongoose.connect("mongodb://13.124.86.217:27017/words");
mongoose.connection.on( 'open', function(){
    console.log(mongoose.connection.collection);
    mongoose.connection.on('open', function(){
       mongoose.connection.db.collectionNames( function(err, names){
           console.log( names );
           mongoose.disconnect();
       }) ;
    });
} );