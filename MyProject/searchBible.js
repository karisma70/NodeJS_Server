/**
 * Created by Administrator on 2017-05-24.
 */

var  searchBible = (function() {
    var MongoClient = require('mongodb').MongoClient;

    function callbackDB( err, db ){
        if (err) {
            console.log("Fail!!! Connect to mongodb : " + err);
            return;
        }

        console.log("Success authenticate!! ");

        var myDB = db.db("bible_service");
        if (myDB) {
            console.log("db is exist");
        }

        myDB.collection("bible", function (err, bible) {
            bible.find({title: "열왕기상", chapter: "5", paragraph: "1"}, function (err, items) {
                console.log("----------------------------------");
                items.toArray(function (err, itemArr) {
                    console.log("Document Array : ");
                    console.log(itemArr);
                });
            });   // end of nebulae.find
        });

        setTimeout(function () {
            db.close();
            console.log("db.close() ");
        }, 3000);
    }

    MongoClient.connect("mongodb://bibleAdmin:daejin70@localhost:1001/bible_service", callbackDB );

}());
