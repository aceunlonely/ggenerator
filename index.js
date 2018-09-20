//var me = require('./mainEngine')

var me = require('ggenerator-engine')
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