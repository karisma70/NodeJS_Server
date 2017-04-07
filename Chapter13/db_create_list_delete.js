/**
 * Created by david on 2017-04-06.
 */
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect( "mongodb://localhost/", function(err, db){
    if( err ){
        console.log("Faile to connect localhost");
        return;
    }
    var adminDB = db.admin();
    adminDB.listDatabases( function(err, databases ){
        console.log(" Before Add Data List: ");
        console.log( databases );
    });

    var newDB = db.db("newDB"); //    Db 생성

    newDB.createCollection( "newCollection", function(err, collection){     //  Collections 생성
       if( err ) {
           console.log("Call newCollection Fail!!");
           return;
       }
        console.log("New Database and Collection Created.");
        adminDB.listDatabases( function(err, databases){
           console.log( "After add database List: ");
           console.log( databases );
           db.db("newDB").dropDatabase(function(err, results){
               if( err ){
                   console.log("Call newDB.dropDatabase Fail!!");
                   return;
               }
               if( results == true )
                    console.log("Database dropped!!");
               else
                    console.log( "Fail drop of Database !!!" );

               setTimeout( function(){
                  adminDB.listDatabases( function(err, results ){
                      var found = false;
                      for( var i = 0; i < results.databases.length; i++ ){
                          if( results.databases[i].name == "newDB" )
                              found = true;
                      }
                      if( !found ){
                          console.log("After Delete Database List: " );
                          console.log( results );
                      }
                      db.close();
                  }) ;
               }, 15000 );
           }) ;
        });
    });

} );