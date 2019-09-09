const esclient = require('elasticsearch')

const  client = new esclient.Client({

    hosts: [ 'http://localhost:9200']

})

module.exports=client;