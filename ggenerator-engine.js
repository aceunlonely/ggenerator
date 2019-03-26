var compress = require('ggenerator-compress')
var tempEngine = require('ggenerator-template-engine')
var gu= require('./ggenerator-utils')
var fs = require('fs')
var path =require('path')
var fom= require('./ggenerator-fom')
var config=require('peeriocjs').invoke("config").sync.config() //require('../config')
var xml2js = require('xml2js');
var util = require('./utils')

var ioc=require('peeriocjs').module("gg-engine")

ioc.reg("preMainExecuting",function(env){},null,true)
ioc.reg("afterMainExecuting",function(env){},null,true)

// var builder = new xml2js.Builder();  // JSON->xml
var parser =  new xml2js.Parser({explicitArray : false, ignoreAttrs : true , async: false}); 


/**
 *  fom is in ignore 
 * @param {string} fom 
 * @param {*} dDataJson 
 */
var fomIsInIgnore = function(fom, dDataJson){
    if(dDataJson.tc && dDataJson.tc.fom && dDataJson.tc.fom.ignore){
        return in_array(fom,dDataJson.tc.fom.ignore)
    }
    return false;
}
function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
     thisEntry = arrayToSearch[s].toString();
     if (thisEntry == stringToSearch) {
      return true;
     }
    }
    return false;
}
//compress.unzip('d:/test/test.zip','d:/test/test2')

//get template object
var getTd=function(env){
    var tempTConfig = require( path.join( env.templatePackageRootPath ,'Config'))
    var tempDConfig = require(env.dynamicRootPath + '/Config')
    var tempDData = require(env.dynamicRootPath + '/DataObject')
    if(JSON.stringify(tempDData) == "{}"){ console.log("gg-engine: find ddataObject is {} ,pliz take care");}
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

//注册模板引擎 模板的扩展方法
var _registerTemplateExt=function(extPath,templateEngine){

    //只有当存在注册方法时才注册
    if(tempEngine.register)
    {
        var ext = require(extPath)
        //只有存在 templateEngineExt节点时，进行注册
        if(ext && ext.templateEngineExt){
            for(var key in ext.templateEngineExt){
                var fn = ext.templateEngineExt[key]
                if(typeof fn == 'function')
                {
                    tempEngine.register(key,fn);
                }
            }
        }
    }
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
                    if(util.endWith(fileName,'.fom') && !fomIsInIgnore(fileName,renderJson))
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
                try{
                    templateEngine.renderFile(workspace +'/' + file,tgt + '/' + file,renderJson,true)
                }
                catch(ex)
                {
                    console.log("gg-engine:renderFileFailed :"  )
                    console.log("\tfile :" + workspace + '/' + file   )
                    console.log("\trenderJson:" + JSON.stringify(renderJson))
                    throw ex;
                }
            }
        })
    }
}



exports.run =function (params,callback) {
    var dDataSrcPath = params.dDataPath
    var tpName = params.templatePackage
    var tgtPath = params.targetPath
    var isDebug = params.debug || false
    var workplace = params.workplace

    if(config.isTest)
    {
        dDataSrcPath = 'test/demo005/dData.zip'
        tpName = 'test'
        tgtPath = null
        isDebug =true
    }
    //-1. check params
    var absoluteTpPath = null;
    if(path.isAbsolute(tpName))
    {
        absoluteTpPath = tpName;
    }
    else
    {
        absoluteTpPath = path.join(config.templatePackagesDefaultPath,tpName);
    }
    if(!fs.existsSync(absoluteTpPath)){ throw new Error("gg does not have the templatePackage : " + tpName )}

    // when  dDataSrcPath is null,and is ComboTemplate  ddata use TTData
    //console.log(path.join(absoluteTpPath,"TDData"))
    if(!dDataSrcPath && fs.existsSync(path.join(absoluteTpPath,"TDData")))
        dDataSrcPath = path.join(absoluteTpPath,"TDData")
    //dDataSrcPath check
    if(!fs.existsSync(dDataSrcPath)){
        throw new Error("you must give a right ddata path : " + dDataSrcPath )
    }

    //0. create folder of workplace
    var wp = config.workplaceDefaultPath
    if(workplace)
    {
        //if param has workplace，use it
        wp=workplace
        gu.mkdirSync(wp)
    }
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
    if(!fs.existsSync(tgtPath)) gu.mkdirSync(tgtPath)

    //combine env
    var env= {
            targetPath : tgtPath,   // 目标路径
            templatePackageRootPath : absoluteTpPath,
            dynamicRootPath : dDataPath,     //动态包解压位置

             refPath: path.join(absoluteTpPath,'TemplateFiles'),    //引用路径
             extPath: path.join(absoluteTpPath,'Ext'),    //扩展包位置
             dynamicPath: path.join(dDataPath,'FileCollection'),       //动态引用路径
             workspace: tempPath                                               //工作路径

            }
    if(config.verbose){
        console.log("\t[info]templatePackagePath(模板包路径) : "+ absoluteTpPath)
        console.log("\t[info]ddataSourcePath(动态数据源路径) : " + dDataSrcPath)
        console.log("\t[info]workspace(工作空间路径) : " + tempPath)
        console.log("\t[info]targetPath(目标路径) : " + tgtPath)
    }
            
    //main logic
    var mainExcutor=function() {
            //debugger;
            //2. read dData json
            var dDataJson = getTd(env)
            if(isDebug){
                console.log("dataJson+++++++++++++++++++++++++++++++++++++++")
                console.log(dDataJson)
            }
            //3. create real workspace
            gu.copyDir(path.join(env.templatePackageRootPath,'Workspace'),env.workspace)
            //3.5 load ext methods to tempEngine
            _registerTemplateExt(env.extPath,tempEngine);

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
        };

    var iocMainExcutor = function(){
        ioc.invoke("preMainExecuting").preMainExecuting(env).then(mainExcutor).then(function(){
            ioc.invoke("afterMainExecuting").afterMainExecuting(env)
        })
    }

    if(gu.isDirectory(dDataSrcPath))
    {
        // is DataObject or DData
        if(fs.existsSync(path.join(dDataSrcPath,"DataObject")))
        {
            // here is ddata
            gu.copyDir(dDataSrcPath,env.dynamicRootPath,iocMainExcutor)
        }
        else{
            //here is dataobject
            gu.copyDir(__dirname + "/sundry/emptyDData",env.dynamicRootPath,function(){
                gu.delDir(path.join(env.dynamicRootPath,"DataObject"))
                gu.copyDir(dDataSrcPath,path.join(env.dynamicRootPath,"DataObject"), iocMainExcutor)
            })
        }
    }
    else
    {
        //is endwith .js
        if(util.endWith(dDataSrcPath,'.zip')){
            //1. unpack dData package
            compress.unzip(dDataSrcPath,env.dynamicRootPath,iocMainExcutor)
        }
        else if(util.endWith(dDataSrcPath,'.js')){
            //ddata is a js file
            gu.copyDir(__dirname + "/sundry/emptyDData",env.dynamicRootPath,function(){
                fs.copyFile(dDataSrcPath,path.join(env.dynamicRootPath,"DataObject/index.js"),iocMainExcutor)
            })
        }
        else if(util.endWith(dDataSrcPath,'.json')){
            //ddata is a json file
            gu.copyDir(__dirname + "/sundry/emptyDData",env.dynamicRootPath,function(){
                fs.copyFile(dDataSrcPath,path.join(env.dynamicRootPath,"DataObject/index.json"),iocMainExcutor)
            })
        }
        else
        {
            throw Error("GG-engine: ddata is not right formatted : " + dDataSrcPath)
        }
        
    }
    
}

exports.addTemplate= function(ti){

        ti.templatePackageName
        ti.tempalatePath
        //删除原模板
        var tgtPath = path.join(config.templatePackagesDefaultPath , ti.templatePackageName)
        gu.delDir(tgtPath)
        //unzip
        compress.unzip(ti.tempalatePath,tgtPath,function() {})
}