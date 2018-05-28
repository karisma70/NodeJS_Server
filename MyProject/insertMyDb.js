/**
 * Created by Administrator on 2018-05-27.
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:20001/";
// var url = "mongodb://mydb:daejin70@localhost:20001/mydb";

MongoClient.connect(url, function(err, db) {
    if (err)
        throw err;
    var dbo = db.db("mydb");
    console.log("mydb is valid! " + dbo.name );

    /*
     var myobj = { name: "Company Inc", address: "Highway 37" };
     dbo.collection("customers").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     db.close();
     });
     */

    var myobj = null;
    var idx = 0;

    for( idx =10; idx > 0; idx -- ) {
        var vName = idx + "-name";
        myobj = {name: vName, address: "Highway 37" , order: idx };
        console.log( "insert Obj name: " + vName + ", idx : " + idx );

        dbo.collection("customers").insertOne( myobj, function (err, res){
            if (err)
                throw err;
            console.log("1 document inserted " );
        });

    }
    db.close();

});

