
'use strict';


function bind(obj, fnFieldName) {
    return obj[fnFieldName].bind(obj);
}

module.exports= bind;
