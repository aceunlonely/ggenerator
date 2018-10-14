require('./config')

//reg uiddata method
require('./uiddata')
//var me = require('./mainEngine')
var me = require('ggenerator-engine')
var fs = require('fs')
var path= require('path')

var program = require('commander');

var config =require('peeriocjs').invoke("config").sync.config();

var utils = require('./utils')

var currentPath = process.cwd()
//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version('1.0.0')
    .usage('\r\n\t-p tepmlateName [-d ddata] [-t targetPath] [-w workplace]'
    + '\r\n\t-p tepmlateName [-d ddata] [-t targetPath] [-w workplace] [--debug true]'
    + '\r\n\t-p tepmlateName'
    + '\r\n\ttepmlateName'
    + '\r\n\ttepmlateName ddata'
    + '\r\n\t-o config')
    .option('-d --data [value]', '\r\n\t可空\r\n\t动态数据包路径,支持ddata文件夹,ddataZip,DataObject文件夹\r\n\t支持单个数据源JSON或者js，并支持相对路径\r\n\t空值时,说明调用的combo模板的TDData', null)
    .option('-p --templateName [value]', '模板名，或者模板文件夹路径、或者模板zip路径，并支持相对路径')
    .option('-t --targetPath [value]', '目标地址,支持相对路径，空值时，为当前路径' + currentPath ,"./","./")
    .option('-u --debug <debug>', 'debug use', /^(true|false)$/i, "false")
    .option('-o --operation <exe>', '\r\n\t(default:exe)\r\n\texe:生成\r\n\tconfig:配置', 'exe')
    .option('-w --workplace [value]', '工作目录,支持相对路径，默认值是全局配置:' + config.workplaceDefaultPath)
    .parse(process.argv);

    //process.cwd() todo
    
    var p = {
        dDataPath: program.data,
        templatePackage: program.templateName,
        targetPath: program.targetPath,
        debug: program.debug == 'true',
        workplace : program.workplace
    }
    //模板未传，采用第一个参数
    if(!p.templatePackage && program.args.length>0)
    {
        p.templatePackage = program.args[0]
    }
    //ddata未传，采用第二参数
    if(!p.dDataPath && program.args.length>1)
    {
        p.dDataPath = program.args[1]
    }
    //相对目录支持
    if(p.templatePackage && !path.isAbsolute(p.templatePackage)){
        if(fs.existsSync(path.join(currentPath,p.templatePackage))){
            p.templatePackage = utils.getRigthTgt(currentPath,p.templatePackage)
        }
    }
    if(p.dDataPath && !path.isAbsolute(p.dDataPath)){
        if(fs.existsSync(path.join(currentPath,p.dDataPath))){
            p.dDataPath = utils.getRigthTgt(currentPath,p.dDataPath)
        }
    }
    if(p.targetPath && !path.isAbsolute(p.targetPath)){
        p.targetPath = utils.getRigthTgt(currentPath,p.targetPath) // path.join(currentPath,p.targetPath)
    }
    if(p.workplace && !path.isAbsolute(p.workplace)){
        p.workplace = utils.getRigthTgt(currentPath,p.workplace)
    }


switch (program.operation) {
    case 'exe':
        if (program.debug == 'true') {
            console.log("ggenerator debug on")
            me.run(p, function () {
                console.log('mission completed')
            })
        }
        else {
            try {
                me.run(p, function () {
                    console.log('mission completed')
                })
            }
            catch (e) {
                    console.log(e.message)
            }
        }
        break;
    //添加模板
    case 'addTemplate':
        var p = {
            templatePackageName: program.templateName,
            tempalatePath: program.data
        }
        me.addTemplate(p)
        break;
    case 'config':
        require('peeriocjs').invoke("setConfig").sync.setConfig();
        break;
}

