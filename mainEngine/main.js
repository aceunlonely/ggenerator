var compress = require('./compress')
var tempEngine = require('./templateEngine')
var gu= require('ggenerator-utils')
var fs = require('fs')
var path =require('path')
var fom= require('./fom')
var config=require('../config')
var xml2js = require('xml2js');

var builder = new xml2js.Builder();  // JSON->xml
var parser =  new xml2js.Parser({explicitArray : false, ignoreAttrs : true , async: false}); 


//compress.unzip('d:/test/test.zip','d:/test/test2')

//get template object
var getTd=function(env){
    var tempTConfig = require("../"+env.templatePackageRootPath +'/Config')
    var tempDConfig = require("../"+env.dynamicRootPath + '/Config')
    var tempDData = require("../"+env.dynamicRootPath + '/DataObject')
    return {
        data : null,
        tConfig :tempTConfig,
        tc: tempTConfig,
        dConfig : tempDConfig,
        dc : tempDConfig,
        ddata: tempDData ,
        d : tempDData
    }
}

var endWith=function(str,s){
  if(s==null||s==""||str.length==0||s.length>str.length)
     return false;
  if(str.substring(str.length-s.length)==s)
     return true;
  else
     return false;
 }


/**
 *  递归处理fom
 */
var execFomRecurring = function(env,templateEngine,renderJson){
    if(fs.existsSync(env.workspace))
    {
        while(true)
        {
            var dirs = new Array();
            files = fs.readdirSync(env.workspace)
            var hasFom = false
            for(var i in files)
            {
                var fileName = files[i]
                var fileStat = fs.statSync(env.workspace +'/' + fileName)
                if(fileStat.isDirectory())
                {
                    dirs.push(fileName)
                }
                else
                {
                    //find a fom
                    if(endWith(fileName,'.fom'))
                    {
                        var fomXml = fs.readFileSync( path.join(env.workspace,fileName),"utf-8")
                        //渲染 TE render fom and parse fom
                        fomXml = templateEngine.renderContent(fomXml,renderJson)
                        //转换
                        parser.parseString(fomXml,function (err, result) {
                            //do fom
                            fom.run(result,env,templateEngine,renderJson)
                        })
                        hasFom =true
                        //删除该fom文件
                        fs.unlinkSync(path.join(env.workspace,fileName))
                        break;
                    }
                }
            }
            if(hasFom)
            {
                continue
            }
            while(dirs.length>0)
            {
                var dir = dirs.pop()
                //deep copy env
                var newEnv = JSON.parse(JSON.stringify(env));
                //修正workspace
                newEnv.workspace = path.join(env.workspace,dir)
                //recurse
                execFomRecurring(newEnv,templateEngine,renderJson)
            }
            break;
        }
    }}

/**
 * 递归渲染文件夹
 */
var execRenderRecurring = function(workspace,tgt,templateEngine,renderJson){
    //asyn to accelerate
    // fs.exists(workspace,function (exists) {
    //     if(!fs.existsSync(tgt)){ fs.mkdirSync(tgt)}
    //     if(exists)
    //     {
    //         var files = fs.readdirSync(workspace)
    //         files.forEach(function(file,index){
    //             if(fs.statSync(workspace +'/' + file).isDirectory())
    //             {
    //                 //recurse
    //                 execRenderRecurring(workspace +'/' + file,tgt + '/' + file,templateEngine,renderJson)
    //             }
    //             else
    //             {
    //                 templateEngine.renderFile(workspace +'/' + file,tgt + '/' + file,renderJson)
    //             }
    //         })

    //     }
    // })

    if(fs.existsSync(workspace))
    {
        if(!fs.existsSync(tgt)){ fs.mkdirSync(tgt)}
        var files = fs.readdirSync(workspace)
        files.forEach(function(file,index){
            if(fs.statSync(workspace +'/' + file).isDirectory())
            {
                //recurse
                execRenderRecurring(workspace +'/' + file,tgt + '/' + file,templateEngine,renderJson)
            }
            else
            {
                templateEngine.renderFile(workspace +'/' + file,tgt + '/' + file,renderJson)
            }
        })
    }
}



exports.run =function (params,callback) {
    var dDataSrcPath = params.dDataPath
    var tpName = params.templatePackage
    var tgtPath = params.targetPath
    var isDebug = params.debug || false

    if(config.isTest)
    {
        dDataSrcPath = 'test/demo005/dData.zip'
        tpName = 'test'
        isDebug =true
    }

    //-1. check params
    if(!fs.existsSync(path.join('templatePackages',tpName))){ throw new Error("gg does not have the templatePackage : " + tpName)}

    //0. create folder of workplace
    var wp = config.workplace
    var nwp= path.join(wp,Date.now().toString())
    fs.mkdirSync(nwp)
    //dData
    var dDataPath = path.join(nwp,'dData')
    //fs.mkdirSync(dDataPath)
    //temp
    var tempPath = path.join(nwp,'temp')
    fs.mkdirSync(tempPath)
    //tgt
    if(!tgtPath || tgtPath=='') tgtPath=path.join(nwp,'tgt')
    if(!fs.existsSync(tgtPath)) fs.mkdirSync(tgtPath)

    //combine env
    var env= {
            targetPath : tgtPath,   // 目标路径
            templatePackageRootPath : path.join('templatePackages',tpName),
            dynamicRootPath : dDataPath,     //动态包解压位置

             refPath: path.join('templatePackages',tpName,'TemplateFiles'),    //引用路径
             dynamicPath: path.join(dDataPath,'FileCollection'),                       //动态引用路径
             workspace: tempPath                                               //工作路径

             }

    //1. unpack dData package
    compress.unzip(dDataSrcPath,env.dynamicRootPath,function() {
        //2. read dData json
        var dDataJson = getTd(env)
        //3. create real workspace
        gu.copyDir(path.join(env.templatePackageRootPath,'Workspace'),env.workspace)
        //4. foreach find fom
        execFomRecurring(env,tempEngine,dDataJson)
        //7. recurring render all files to tgt
        execRenderRecurring(env.workspace,env.targetPath,tempEngine,dDataJson)

        if(callback)
        {
            callback()
        }

        //在非调试情况下，会删除中间记录
        if(!isDebug)
        {
            gu.delDir(nwp)
        }
    })
    
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
            console.log('++++++++++++++++')
            break;
        case 'i':
        case 'init':
            //doback 
            gu.delDir('test/demo004/tgt');
            gu.delDir('test/demo003/workspace')
            gu.delDir('test/demo1_test')
            fs.exists('test/test.zip',function(e){ if(e){ fs.unlinkSync('test/test.zip') }})
            break;
        case 'require':
            var test =require('../test/demo006')
            console.log(test.name)
            console.log(test.age)
            break;
        case 'eval':
            console.log('name:' + eval("jsonData.name"))
            console.log('hobbies.length : ' + eval("jsonData.hobbies.length"))
            break;
        case 'fatherdir':
            console.log(path.dirname('dir1/dir2/dir/') + '\n')
            console.log('dir1/dir2/dir/1.txt \n');
            console.log(path.dirname('dir1/dir2/dir/1.txt') + '\n')
            console.log(path.dirname(path.dirname('dir1/dir2/dir/1.txt')) + '\n')
            console.log(path.dirname(path.dirname(path.dirname('dir1/dir2/dir/1.txt'))) + '\n')
            console.log(path.dirname(path.dirname(path.dirname(path.dirname('dir1/dir2/dir/1.txt')))) + '\n')
            console.log(path.dirname(path.dirname(path.dirname(path.dirname(path.dirname('dir1/dir2/dir/1.txt'))))) + '\n')
            break;
        default:
        break;

    }
    console.log('test terminated')
}