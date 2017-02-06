var fs = require('fs')
var path =require('path')
var gu= require('ggenerator-utils')



var endWith=function(str,s){
  if(s==null||s==""||this.length==0||s.length>this.length)
     return false;
  if(str.substring(this.length-s.length)==s)
     return true;
  else
     return false;
  return true;
 }

 var startWith=function(str,s){
  if(s==null||s==""||this.length==0||s.length>this.length)
   return false;
  if(str.substr(0,s.length)==s)
     return true;
  else
     return false;
  return true;
 }



exports.run=function(fom,env){
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
    for(var index in fom.FOM.NODE){
        var node = fom.FOM.NODE[index]
        var op = 'COPY'
        if(node['OPERATE'])
        {
            op= node['OPERATE']
        }
        switch(op.toUpperCase())
        {
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
                tgt = path.join(env.workspace,tgt)
                if(!fs.existsSync(path.dirname(tgt)))
                {
                    fs.mkdirSync(path.dirname(tgt));
                }
                fs.writeFile(tgt,fs.readFileSync(src));
                break;
            case 'D':
            case 'DELETE':
                var tgt=node["TARGET"] || node["T"]
                if(!tgt) throw new Error("fom: when delete tgt is not nullable ")
                tgt = path.join(env.workspace,tgt)
                if(fs.existsSync(tgt)) fs.unlinkSync(tgt)
                break;
            case 'R':
            case 'RENAME':
                var src=node["SOURCE"] || node["S"]
                var tgt=node["TARGET"] || node["T"]
                if(!src) throw new Error("fom: when copy src is not nullable ")
                if(!tgt) throw new Error("fom: when copy tgt is not nullable ")
                src = path.join(env.workspace,src)
                tgt = path.join(env.workspace,tgt)
                fs.rename(src,tgt)
                break;
            default:
                throw new Error("fom:unknow operate: " + op)
                break;

        }

    }
}