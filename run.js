var me = require('./mainEngine')
var program = require('commander');

//  node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt
//get params
program.version('0.0.1')
    .option('-d --data [value]','动态数据包路径','null')
    .option('-p --templateName [value]','模板名')
    .option('-t --targetPath [value]','目标地址')
    .option('-u --debug <debug>','debug use',/^(true|false)$/i, "false")
    .parse(process.argv);


var p = {
    dDataPath : program.data,
    templatePackage : program.templateName,
    targetPath : program.targetPath,
    debug : program.debug == 'true'
}

try
{
    if(program.debug== 'true')
    {
        console.log("ggenerator debug on")
    }
    me.run(p,function(){
        console.log('mission completed')
    })
    
}
catch(e)
{
    if(program.debug== 'true')
    {   
        console.log(e)
    }
    else
    {
        console.log(e.message)
    }
}