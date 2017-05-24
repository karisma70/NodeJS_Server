/**
 * Created by Administrator on 2017-05-22.
 */

function isNumber( str ) {
    str += ''; // 문자열로 변환
    str = str.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
    if (str == '' || isNaN(str))
        return false;
    return true;
}

var readBibleText = (function(){

    var chapterTitle = require('./chapterTitle');
    var fs = require('fs');

    var options = { encoding: 'utf8', flag: 'r' };

    var bibleContents = new Array();

    function getRowContent( rowString ){
        var chapterPos = rowString.indexOf(" ");

        if( chapterPos < 1 )
            return;

        var chapterText = rowString.substring( 0, chapterPos );
        var numberLoc = chapterText.indexOf( ":");

        var chapterNum = "";
        var shortTitle = "";

        for (var i = 0; i < numberLoc; i++) {
            var text = chapterText.charAt(i);
            if (isNumber(text))
                chapterNum += text;
            else
                shortTitle += text;
        }

        chapterNum = parseInt(chapterNum);
        chapterNum = chapterNum.toString();

        var paragraphNum = rowString.substring(numberLoc + 1, chapterText.length);
        paragraphNum = parseInt(paragraphNum);
        paragraphNum = paragraphNum.toString();

        var content = rowString.substring(chapterText.length+1, rowString.length);

        var chapterObj = chapterTitle.findByChar( shortTitle );

        if( chapterObj ) {
            var bibleRowText = {
                "shortTitle": shortTitle,
                "title": chapterObj.name,
                "chapter": chapterNum,
                "paragraph": paragraphNum,
                "content": content
            };

            return bibleRowText;
        }
        else{
            console.log( shortTitle + " is Error!!" );
            return null;
        }
    }

    function writeJSONFile() {
        fs.writeFile('data/hangul_bible_utf8.json', JSON.stringify(bibleContents), function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("JSON File write complete!!! ");
        });
    }

    return function( fileName, callback ) {
        // fs.readFile('data/hangul_bible_utf8.txt', options, function (err, data) {
        fs.readFile( fileName, options, function (err, data) {
            if (err) {
                console.log("Failed to open bible file!! " + err);
                return;
            }

            var bibleTextArray = data.split("\n");
            var rowCount = bibleTextArray.length;
            console.log( "whole row count : " + rowCount );

            for (var row = 0; row < rowCount; row++) {
                var rowString = bibleTextArray[row];
                var rowObj = getRowContent(rowString);
                if( rowObj ) {
                    callback(rowObj);
                }
            }   //  end of for

        });
    }

}( ));

/*
readBibleText( function( rowObj ){
    console.log( rowObj );
});
    */


module.exports = {
    readBibleText : readBibleText
};