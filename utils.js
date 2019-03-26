
var path = require('path')
var fs = require('fs')

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

    if(startWith(tgt,'./'))
    {
        tgt = tgt.substr(2)
    }
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

exports.getRigthTgt = getRigthTgt;

exports.startWith = startWith

exports.endWith = (str,s) => {
    if(s==null||s==""||str.length==0||s.length>str.length)
        return false;
    if(str.substring(str.length-s.length)==s)
        return true;
    else
        return false;
}