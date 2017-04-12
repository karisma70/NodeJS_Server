/**
 * Created by david on 2017-03-23.
 */
var g_http = require('http');
var g_url = require('url');
var g_qstring = require('querystring');

function sendResponse( weatherData, res ){

    var page = '<html>\n<head>\n<title>External Example</title></head>' +
            '<body>' +
            '<form method = "post">' +
            'City : <input name = "city"><br>' +
            '<input type="submit" value = "Get Weather">' +
            '</form>';
    if( weatherData ){
        var weatherObj = JSON.parse(weatherData);

        strDesc = 'id: ' + weatherObj.weather[0].id + '<br>' +
        'main: ' + weatherObj.weather[0].main + '<br>' +
        'description: ' + weatherObj.weather[0].description + '<br>' +
        'icon: ' + weatherObj.weather[0].icon + '<br>' +
         'base: ' + weatherObj.base + '<br>' +
        'temp: ' + weatherObj.main.temp + '<br>' +
         'pressure: ' + weatherObj.main.pressure + '<br>' +
            '<br>' + weatherData;

        page += '<h1>Weather Info</h1><p>' + strDesc + '</p>';
    }

    page += '</body>\n</html>';
    res.end( page );
}


function parseWeather( weatherResponse, res ){
    var weatherData = '';
    weatherResponse.on( 'data', function(chunk){
       weatherData += chunk;
        weatherData += '\n';
    });
    weatherResponse.on('end', function(){
        sendResponse(weatherData, res);
    });
}


// need key : a24c349975e7c26f39a120927e512cd3
function getWeather(city, res){
    var options = {
        host: 'api.openweathermap.org',    // api.openweathermap.org/data/2.5/weather?q=London
        path: '/data/2.5/weather?q=' + city + '&APPID=a24c349975e7c26f39a120927e512cd3'
    };
    g_http.request(options, function(weatherResponse){
        parseWeather(weatherResponse, res );
    }).end();
}

g_http.createServer(function(req, res){
    console.log(req.method);

    if(req.method == "POST"){
        var reqData = '';
        req.on('data', function(chunk){
           reqData += chunk;
        });
        req.on('end', function(){
           var postParams = g_qstring.parse(reqData);
            getWeather( postParams.city, res );
        });
    } else {
        sendResponse(null, res );
    }
}).listen(8081);