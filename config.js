var uicli = require('uicli.js')
var fs = require('fs')
var cc = require('cli.config.js').system('ggenerator')

var getConfig= function(){
    var config = {
        "workplaceDefaultPath":null, 
        "templatePackagesDefaultPath":null,
        "renderIgnoreFileTypes":"zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg",
        "verbose" :true
    }
     //override
    config = cc.default(config).get()

    //set default
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

require('peeriocjs').reg("config",getConfig,null,true)
require('peeriocjs').reg("setConfig",function(){
    var configLust = {
        "workplaceDefaultPath":null, 
        "templatePackagesDefaultPath":"???(string)["+process.cwd()+"]配置模板所在路径",
        "renderIgnoreFileTypes":"???(string)[zip,rar,7z,tar,gz,iso,doc,docx,pdf,wps,odf,png,gif,jpg]渲染忽略后缀列表",
        "verbose" :true
    }
    var rc = uicli.uiGetJson(configLust).then(data=>{
        cc.set(data)
    })
},null,true)
