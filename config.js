var storage = require('mini-dbx')
var db = storage(__dirname + '/config.json')
var uicli = require('uicli.js')
var fs = require('fs')

var getConfig= function(){
    var config = {
        "workplaceDefaultPath":null, 
        "templatePackagesDefaultPath":null,
        "renderIgnoreFileTypes":"zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg",
        "verbose" :true
    }
    var clone = Object.assign({}, config)
    db.select('config', '#==0',function(err,list){
    	if(err){return;}
    	if(list&& list.length>0){
            config = list[0]
        }
        else
        {
            db.insert('config', clone,function(err,inserted){

            });
        }
    });

    config.workplaceDefaultPath = config.workplaceDefaultPath || (__dirname + "/workplace")
    if(!fs.existsSync(config.workplaceDefaultPath)){
        fs.mkdirSync(config.workplaceDefaultPath)
    }
    config.isTest = false
    config.renderIgnoreFileTypes =  config.renderIgnoreFileTypes||  "zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg"
    config.templatePackagesDefaultPath = config.templatePackagesDefaultPath || __dirname + "/templatePackages"
    config.verbose = config.verbose || true
    return config
}

// var config={
//     workplaceDefaultPath : __dirname + "/workplace",
//     isTest : false,
//     renderIgnoreFileTypes : "zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg",
//     templatePackagesDefaultPath : __dirname + "/templatePackages"
// }

//console.log('config')

require('peeriocjs').reg("config",getConfig,null,true)
require('peeriocjs').reg("setConfig",function(){
    var configLust = {
        "workplaceDefaultPath":null, 
        "templatePackagesDefaultPath":"???(string)["+process.cwd()+"]配置模板所在路径",
        "renderIgnoreFileTypes":"???(string)[zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg]渲染忽略后缀列表",
        "verbose" :true
    }
    var rc = uicli.uiGetJson(configLust).then(data=>{
        db.update('config', data, '',function(err,updated){
            if(!err) console.log('config success:' +JSON.stringify(data));
        });
    })
},null,true)

//module.exports= config
