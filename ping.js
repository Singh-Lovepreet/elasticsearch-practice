const client = require('./client.js')
client.ping({
    requestTimeout: 30000,
}, (error) =>{
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

client.indices.create({
    index:"love"
},(err,res,status) => {

    if(err){
        console.log(err)
    }
    else{
        console.log("create index",res)
    }

});

var bulk =[];

const cities = require('./cities.json');
// declare an empty array called bulk
var bulk = [];
//loop through each city and create and push two objects into the array in each loop
//first object sends the index and type you will be saving the data as
//second object is the data you want to index
cities.forEach((city,i) =>{
    bulk.push({index:{
            _index:"love",
            _type:"cities_list",
            _id:i+1
        }
    })
    bulk.push(city)
})
//perform bulk indexing of the data passed
client.bulk({body:bulk}, function( err, response  ){
    if( err ){
        console.log("Failed Bulk operation".red, err)
    } else {
        console.log("Successfully imported %s".green, cities.length);
    }
});
