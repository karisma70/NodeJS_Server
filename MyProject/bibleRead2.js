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

    var chapterTitle = require('./chapterTitle');       // chapterTitle.js  Javascript 파일에 담겨있는 색인 활용 목적
    var fs = require('fs');

    var options = { encoding: 'utf8', flag: 'r' };

    var bibleContents = new Array();

    var curChapterName = "창세기";
    var chapterOrder = 1;


    function getRowContent( rowString ){

        var chapterPos = rowString.indexOf(" ");

        if( chapterPos < 1 )
            return null;

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
        // chapterNum = chapterNum.toString();

        var paragraphNum = rowString.substring(numberLoc + 1, chapterText.length);
        paragraphNum = parseInt(paragraphNum);
        // paragraphNum = paragraphNum.toString();

        var content = rowString.substring(chapterText.length+1, rowString.length);

        var chapterObj = chapterTitle.findByChar( shortTitle );

        if( curChapterName != chapterObj.name ){
            curChapterName = chapterObj.name;
            chapterOrder ++;
        }

        if( chapterObj ) {
            var bibleRowText = {
                "bookNumber" : chapterOrder,
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
    }  // end of  getRowContent()

    function writeJSONFile() {
        fs.writeFile('data/hangul_bible_utf8.json', JSON.stringify(bibleContents), function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("JSON File write complete!!! ");
        });
    }

    return function( fileName, fetchCallback, endCallback ) {
        // fs.readFile('data/hangul_bible_utf8.txt', options, function (err, data) {
        fs.readFile( fileName, options, function (err, data) {
            if (err) {
                console.log("Failed to open bible file!! " + err);
                return;
            }

            var bibleTextArray = data.split("\n");
            var rowCount = bibleTextArray.length;
            console.log( "whole row count : " + rowCount );

            var chapterList = [];
            var chapterName = "";
            var lastNum = 0;
            var chapterOrder = 0;

            for (var row = 0; row < rowCount; row++) {
                var rowString = bibleTextArray[row];
                var rowObj = getRowContent(rowString);
                if( rowObj == null )
                    continue;

                if( row == 0 ){
                    chapterName = rowObj["title"];
                }

                var newChapterName = rowObj["title"];
                if( newChapterName == "요한계시록"){
                    console.log( "!!! " + newChapterName );
                }
                if( newChapterName != chapterName ){
                    var chapter = {
                        "bookNumber" : chapterOrder,
                        "title" : chapterName,
                        "lastNum" : lastNum
                    };
                    chapterList.push( chapter );
                    chapterName = newChapterName;
                }

                chapterOrder = rowObj["bookNumber"];
                lastNum = rowObj["chapter"];

                fetchCallback(rowObj);

            }   //  end of for

            var lastChapter = {
                "bookNumber" : chapterOrder,
                "title" : chapterName,
                "lastNum" : lastNum
            };
            chapterList.push( lastChapter );

            endCallback( chapterList );
        });
    };   // end of readBibleText

}( ));

/*
 readBibleText( function( rowObj ){
 console.log( rowObj );
 });
 */


module.exports = {
    readBibleText : readBibleText
};/**
 * Created by Administrator on 2017-07-13.
 */
