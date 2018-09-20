var me = require('./mainEngine')
require('./config')

exports.run = function(dDataPath,template,targetPath,workplace,callback){
    var p = {
            dDataPath: dDataPath,
            templatePackage: template,
            targetPath: targetPath,
            debug: false,
            workplace : workplace
        }
     me.run(p,callback)
}