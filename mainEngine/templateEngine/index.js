var juicer = require('juicer')
var fs = require('fs')

//需要保留换行
juicer.set('strip',false);

//渲染内容
function renderContent(tpl,data)
{
    return juicer(tpl,data)
}


//渲染
exports.renderContent=renderContent;
exports.renderFile = function(tplFile,tgtFile,data){
    var content = fs.readFileSync(tplFile,'utf-8');
    var r = juicer(content,data)

    fs.writeFileSync(tgtFile,r)
};
exports.renderDir = function(tplDir,tgtDir,data)
{

}

exports.register =function(fnName,fn){
    juicer.register(fnName,fn);
}