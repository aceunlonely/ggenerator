require('./config')
//var me = require('./mainEngine')
var me = require('ggenerator-engine')

var program = require('commander');

var config =require('peeriocjs').invoke("config").sync.config();
//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version('1.0.0')
    .usage('[options] <file ...>')
    .option('-d --data [value]', '\r\n\t可空\r\n\t动态数据包路径,支持ddata文件夹,ddataZip,DataObject文件夹\r\n\t支持单个数据源JSON或者js，并支持相对路径\r\n\t空值时,说明调用的combo模板的TDData', null)
    .option('-p --templateName [value]', '模板名，或者模板文件夹路径、或者模板zip路径，并支持相对路径')
    .option('-t --targetPath [value]', '目标地址,支持相对路径，空值时，将存到全局配置：' + config.workplaceDefaultPath )
    .option('-u --debug <debug>', 'debug use', /^(true|false)$/i, "false")
    .option('-o --operation <exe>', 'operation', 'exe')
    .option('-w --workplace [value]', '工作目录，默认值是全局配置:' + config.workplaceDefaultPath)
    .parse(process.argv);

    //process.cwd() todo

switch (program.operation) {
    case 'exe':
        var p = {
            dDataPath: program.data,
            templatePackage: program.templateName,
            targetPath: program.targetPath,
            debug: program.debug == 'true',
            workplace : program.workplace
        }

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
}

