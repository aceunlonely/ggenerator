

var config={
    workplaceDefaultPath : __dirname + "/workplace",
    isTest : false,
    renderIgnoreFileTypes : "zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg",
    templatePackagesDefaultPath : __dirname + "/templatePackages"
}

//console.log('config')

require('peeriocjs').reg("config",function(){return config;})

//module.exports= config
