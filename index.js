var me = require('./mainEngine')

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