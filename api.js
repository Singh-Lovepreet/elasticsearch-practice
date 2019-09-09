const es = require('elasticsearch');
const client = new es.Client({
    hosts: ['http://localhost:9200']
});

class API {


//for searching data from database
    async hello(params) {
        console.log('params: ', params);
        //return {msg: 'done'};
        let body = {
        //     query: {
        //         match: {
        //             name: "Sant"
        //         }
        //     }
        //
        //     multi_match: {
        //         query: 'San',
        //         fields: ['name ', 'authors.firstname',  'authors.lastname']
        //     }
        // }

            bool: {
                must: [
                    {
                        match: {
                            name: 'San'
                        }
                    }
                ],
                    filter: [
                    {
                        range: {
                            lat: {
                                gte: 42.55623,
                                lte: 42.50779
                            }
                        }
                    }
                ]
            }
        }
        const res = await client.search({index: 'love', body: body, type: 'cities_list'});
        console.log(res.hits.hits);
        return res.hits.hits
        }



        // const startTime = Date.now();

        // return client.search({index: 'love', body: body, type: 'cities_list'}).then(function (res) {
        //
        //         console.log(res.hits.hits);
        //         return res.hits.hits
        //
        //     }
        // );




    // for creating index

    async createIndex(params){
       const index= await client.indices.create({
            index: 'blog'
        })

console.log(index)
        return index;
    }

    // for delete index

    async deleteIndex (params){

       const res =await  client.indices.delete({index: 'blog'})

       console.log(res)
        return res;
    }
}
let instance;

function getInstance() {
    if (!instance) instance = new API();
    return instance;
}

exports.getInstance = getInstance;
