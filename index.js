//var me = require('./mainEngine')

require('./config')
var me = require('ggenerator-engine')

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
