var me = require('./mainEngine')
var program = require('commander');

//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version('0.0.1')
    .option('-d --data [value]', '动态数据包路径,或者模板路径', 'null')
    .option('-p --templateName [value]', '模板名')
    .option('-t --targetPath [value]', '目标地址')
    .option('-u --debug <debug>', 'debug use', /^(true|false)$/i, "false")
    .option('-o --operation <exe>', 'operation', 'exe')
    .parse(process.argv);


switch (program.operation) {
    case 'exe':
        var p = {
            dDataPath: program.data,
            templatePackage: program.templateName,
            targetPath: program.targetPath,
            debug: program.debug == 'true'
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