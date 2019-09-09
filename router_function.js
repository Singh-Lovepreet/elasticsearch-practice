const cookieParser = require('cookie');
const CONFIG = require('config');


function callAPI(req, res, apiMethod, apiMethodString) {
    let params = {};
    if (req.method.toLowerCase() === 'get')
    {
        params = req.params;
    }
    if (['put', 'post'].includes(req.method.toLowerCase())) {
        params = req.params;
        params.post = req.body;
    }
    params.headers = req.headers;
    params.query = req.query;
    params.middlewareStorage = req.middlewareStorage;

    apiMethod(params)
        .then(function (result) {

            console.log(result)
            res.send(result);
        })
        .catch(function (error) {
            console.log(error )
        });
}
exports.callAPI = callAPI;
