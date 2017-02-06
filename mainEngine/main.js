var compress = require('./compress')
var tempEngine = require('./templateEngine')
var gu= require('ggenerator-utils')
var fs = require('fs')



//compress.unzip('d:/test/test.zip','d:/test/test2')


exports.run =function (params) {
    //do something
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
            gu.existsDir('test/demo004/src','test/demo004/tgt',function(){})
            gu.copyDir('test/demo004/src','test/demo004/tgt');
            break;
        case 'fom':
            
            break;
        default:
        break;

    }
    console.log('test terminated')
}