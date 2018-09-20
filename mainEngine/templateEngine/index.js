var juicer = require('juicer')
var fs = require('fs')
var config = require('../../config')
var ggUtil = require('ggenerator-utils')

//需要保留换行
juicer.set('strip', false);

var innerRp = function ($, statement) {
    //console.log($);    
    return $.substring(4, $.length - 2);
};

//渲染内容
function renderContent(tpl, data, isFinal) {
    var temp = juicer(tpl, data)

    if (isFinal) {
        //支持final replace功能
        return temp.replace(/<gg\[((?!<gg\[).)*\]>/igm, innerRp)
    }
    return temp;
}


//渲染
exports.renderContent = renderContent;
exports.renderFile = function (tplFile, tgtFile, data, isFinal) {
    //忽略对某些后缀文件的渲染工作
    if (config.renderIgnoreFileTypes && ggUtil.is_filetype(tplFile, config.renderIgnoreFileTypes)) {
        fs.writeFileSync(tgtFile, fs.readFileSync(tplFile))
        return
    }
    var content = fs.readFileSync(tplFile, 'utf-8');
    var r = renderContent(content, data, isFinal)
    fs.writeFileSync(tgtFile, r)
};
exports.renderDir = function (tplDir, tgtDir, data, isFinal) {

}

exports.register = function (fnName, fn) {
    juicer.register(fnName, fn);
}