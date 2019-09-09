const elasticsearch = require('elasticsearch');
const bind = require('./function');
const {callAPI} = require('./router_function');
const API =require('./api').getInstance();


const express = require( 'express' );
const app     = express();
const bodyParser = require('body-parser')
const path    = require( 'path' );

app.use(bodyParser.json());
// set port for the app to listen on
app.set( 'port', process.env.PORT || 3001 );
// set path to serve static files
app.use( express.static( path.join( __dirname, 'public' )));
// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/search',function(req,res){
    callAPI(req,res,bind(API,'hello'));
});
app.get('/create',function(req,res){
    callAPI(req,res,bind(API,'createIndex'));
});
app.get('/delete',function(req,res){
    callAPI(req,res,bind(API,'deleteIndex'));
});
app .listen( app.get( 'port' ), function(){
    console.log( 'Express server listening on port ' + app.get( 'port' ));
} );