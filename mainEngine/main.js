var compress = require('./compress')
var tempEngine = require('./templateEngine')
var gu= require('ggenerator-utils')
var fs = require('fs')
var fom= require('./fom')

var config=require('../config')

var xml2js = require('xml2js');

var builder = new xml2js.Builder();  // JSON->xml
var parser =  new xml2js.Parser({explicitArray : false, ignoreAttrs : true}); 


//compress.unzip('d:/test/test.zip','d:/test/test2')


exports.run =function (params) {
    //0. create folder of workplace
    //1. unpack dData package
    //2. read dData json
    //3. create real workspace
    //4. foreach find fom
    //5. TE render fom and parse fom
    //6. do fom

    //7. recurring render all files to tgt
    
}


exports.test=function (params) {
    console.log('test running..')
    var jsonData ={
        name : 'xyliu',
        age : 100,
        hobbies : [
            {name : "game" , weight: 90 },
            {name : "sleep" , weight:34 },
            {name : "women" , weight:120}
        ]
    };

    switch(params){
        case 'compress':
            compress.zip('test/demo001','test/test.zip')
            break;
        case 'uncompress':
            compress.unzip('test/test.zip','test/demo1_test')
            break;
        case 'template_content':
            var tpl =fs.readFileSync('test/demo002/test.tpl','utf-8')
            var r= tempEngine.renderContent(tpl,jsonData)
            console.log('result:')
            console.log(r);
            break;
        case 'template_file':
            tempEngine.renderFile('test/demo002/test.tpl','test/demo002/test.txt',jsonData)
            console.log('succeed')
            break;
        case 'fs':
            gu.delDir('test/demo004/tgt');
            gu.existsDir(null,'test/demo004/tgt',function(){})
            gu.copyDir('test/demo004/src','test/demo004/tgt');
            break;
        case 'fom':
            // copy workspace
            gu.delDir('test/demo003/workspace')
            gu.existsDir(null,'test/demo003/workspace',function(){})
            gu.copyDir('test/demo003/orignWorkspace','test/demo003/workspace')
            // read fom
            var fomXml = fs.readFileSync('test/demo003/workspace/test.fom',"utf-8")
            parser.parseString(fomXml,function (err, result) {
                //console.dir(JSON.stringify(result));
                //console.log(result.FOM)
                console.log('start test fom......')
                var env={
                    refPath:"test/demo003/refDir",
                    dynamicPath:"test/demo003/dynamicDir",
                    workspace:"test/demo003/workspace"
                }
                fom.run(result,env)
            })
            //fom.run(null,'test/demo003/workspace','test/demo003/tgt')
            break;
        case 'p':
        case 'parse':
            var xml ='<?xml version="1.0" encoding="UTF-8" ?><FOM><NODE><SOURCE>test.js</SOURCE><TARGET>test/a.js</TARGET></NODE><NODE><SOURCE>1/test.fom</SOURCE><TARGET>test/test.fom</TARGET></NODE></FOM>'
            console.log('before parse\n')
            console.log(xml)
            
            parser.parseString(xml,function(err,r){
                console.log('--------------------------------------\n')
                console.log(JSON.stringify(r))
            })
            break;
        case 'i':
        case 'init':
            //doback 
            gu.delDir('test/demo004/tgt');
            gu.delDir('test/demo003/workspace')
            
            break;
        default:
        break;

    }
    console.log('test terminated')
}