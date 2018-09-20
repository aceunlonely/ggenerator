var fs = require('fs')
var path =require('path')
var gu= require('ggenerator-utils')


var isArray = function (object) {
            return object && typeof object === 'object' &&
                Array == object.constructor;
        };

var endWith=function(str,s){
  if(s==null||s==""||str.length==0||s.length>str.length)
     return false;
  if(str.substring(str.length-s.length)==s)
     return true;
  else
     return false;
 }

 var startWith=function(str,s){
  if(s==null||s==""||str.length==0||s.length>str.length)
   return false;
  if(str.substr(0,s.length)==s)
     return true;
  else
     return false;
 }


 // 获取正确的目标地址
 var getRigthTgt= function(workspace,tgt){
    if(startWith(tgt,'../'))
    {
        //path.basename
        var newWorkspace = path.dirname(workspace)
        if(newWorkspace == '.') throw new  Error('fom:getTgt: dont have ../ :' + workspace + "|" + tgt)
        
        //recurse
        tgt = getRigthTgt(newWorkspace,tgt.substr(3))
    }
    else
    {
        tgt = path.join(workspace,tgt)
    }
    if(!fs.existsSync(path.dirname(tgt)))
    {
        gu.mkdirSync(path.dirname(tgt));
        //fs.mkdirSync(path.dirname(tgt));
    }
    return tgt
 }


//todo  1、 target support ../  2、render
var exe =function(fom,env,templateEngine,renderJson){
    //env 环境验证
    if(!env)
    {
        throw new Error('fom must have an env')
    }
    if(!env.refPath)
    {
        throw new Error('fom must have an env.refPath')
    }
    if(!env.dynamicPath)
    {
        throw new Error('fom must have an env.dynamicPath')
    }
    if(!env.workspace)
    {
        throw new Error('fom must have an env.workspace')
    }
    //fom 格式验证
    if(!fom.FOM)
    {
        throw new Error('fom must have root node:FOM');
    }
    //env.refPath = env.refPath.replace(new RegExp("\\","gm"),"/") ;//.replace('\\','/');
    //env.dynamicPath =env.dynamicPath.replace(new RegExp("\\","gm"),"/") ;;
    //env.workspace = env.workspace.replace(new RegExp("\\","gm"),"/") ;;
    //env.tgt = env.tgt.replace(new RegExp("\\","gm"),"/") ;;
    //解析处理
    var array = fom.FOM.NODE
    if(!isArray(array))
        array = fom.FOM
    for(var index in array){
        var node = array[index]
        var op = 'COPY'
        if(node['OPERATE'])
        {
            op= node['OPERATE']
        }
        switch(op.toUpperCase())
        {   
            case 'CD':
            case 'COPYDIR':
                var src=node["SOURCE"] || node["S"]
                var tgt=node["TARGET"] || node["T"]
                if(!src) throw new Error("fom: when COPYDIR src is not nullable ")
                if(!tgt) throw new Error("fom: when COPYDIR tgt is not nullable ")
                if(startWith(src,'./'))
                {
                    src = path.join(env.workspace,src.substr(2))
                }
                else if(startWith(src,'$d/'))
                {
                    src = path.join(env.dynamicPath,src.substr(3))
                }
                else
                {
                    src = path.join(env.refPath,src)
                }
                tgt =  getRigthTgt(env.workspace,tgt)
                if(!fs.existsSync(path.dirname(tgt)))
                {
                    gu.mkdirSync(path.dirname(tgt));
                    //fs.mkdirSync(path.dirname(tgt));
                }
                //copy dir
                gu.copyDir(src,tgt)
                break;
            //COPY
            case 'C':
            case 'COPY':
                var src=node["SOURCE"] || node["S"]
                var tgt=node["TARGET"] || node["T"]
                if(!src) throw new Error("fom: when copy src is not nullable ")
                if(!tgt) throw new Error("fom: when copy tgt is not nullable ")
                if(startWith(src,'./'))
                {
                    src = path.join(env.workspace,src.substr(2))
                }
                else if(startWith(src,'$d/'))
                {
                    src = path.join(env.dynamicPath,src.substr(3))
                }
                else
                {
                    src = path.join(env.refPath,src)
                }
                tgt =  getRigthTgt(env.workspace,tgt)
                if(!fs.existsSync(path.dirname(tgt)))
                {
                    gu.mkdirSync(path.dirname(tgt));
                    //fs.mkdirSync(path.dirname(tgt));
                }

                //DATA 情况
                var data = node["DATA"]
                if(data)
                {   
                    var newRenderJson = JSON.parse(JSON.stringify(renderJson));
                    newRenderJson.data = eval("renderJson." + data);
                    //record data's dataString
                    if(newRenderJson.data)
                    {
                        newRenderJson.data.originString = data
                        newRenderJson.data.toString = data
                    }
                    templateEngine.renderFile(src,tgt,newRenderJson)
                }
                else
                {
                    fs.writeFileSync(tgt,fs.readFileSync(src));
                    //fs.writeFile(tgt,fs.readFileSync(src));
                }
                break;
            case 'D':
            case 'DELETE':
                var tgt=node["TARGET"] || node["T"]
                if(!tgt) throw new Error("fom: when delete tgt is not nullable ")
                tgt =getRigthTgt(env.workspace,tgt) //path.join(env.workspace,tgt)
                if(fs.existsSync(tgt)) fs.unlinkSync(tgt)
                break;
            case 'R':
            case 'RENAME':
                var src=node["SOURCE"] || node["S"]
                var tgt=node["TARGET"] || node["T"]
                if(!src) throw new Error("fom: when copy src is not nullable ")
                if(!tgt) throw new Error("fom: when copy tgt is not nullable ")
                src = path.join(env.workspace,src)
                tgt = getRigthTgt(env.workspace,tgt) //path.join(env.workspace,tgt)

                if(!fs.existsSync(path.dirname(tgt)))
                {
                    gu.mkdirSync(path.dirname(tgt));
                    //fs.mkdirSync(path.dirname(tgt));
                }
                 //DATA 情况
                var data = node["DATA"]
                if(data)
                {   
                    var newRenderJson = JSON.parse(JSON.stringify(renderJson));
                    newRenderJson.data = eval("renderJson." + data);
                    //record data's dataString
                    if(newRenderJson.data){
                        newRenderJson.data.orignString = data
                        newRenderJson.data.toString = data
                    }
                    templateEngine.renderFile(src,tgt,newRenderJson)
                    // var newJson =eval("renderJson." + data);
                    // templateEngine.renderFile(src,tgt,newJson)
                    fs.unlink(src)
                }
                else
                {
                    fs.renameSync(src,tgt)
                }
                break;
            default:
                throw new Error("fom:unknow operate: " + op)

        }

    }
}



exports.run = exe
