
var config = require('./config.json')

config.workplaceDefaultPath = config.workplaceDefaultPath || (__dirname + "/workplace")
config.isTest = false
config.renderIgnoreFileTypes =  config.renderIgnoreFileTypes||  "zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg"
config.templatePackagesDefaultPath = config.templatePackagesDefaultPath || __dirname + "/templatePackages"

// var config={
//     workplaceDefaultPath : __dirname + "/workplace",
//     isTest : false,
//     renderIgnoreFileTypes : "zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg",
//     templatePackagesDefaultPath : __dirname + "/templatePackages"
// }

//console.log('config')

require('peeriocjs').reg("config",function(){return config;},null,true)

//module.exports= config
