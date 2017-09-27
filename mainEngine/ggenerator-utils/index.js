var fs = require('fs'),
    stat = fs.statSync

var path = require('path');

//使用时第二个参数可以忽略  
function mkdir(dirpath, dirname) {
    //判断是否是第一次调用  
    if (typeof dirname === "undefined") {
        if (fs.existsSync(dirpath)) {
            return;
        } else {
            mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        //判断第二个参数是否正常，避免调用时传入错误参数  
        if (dirname !== path.dirname(dirpath)) {
            mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath)
        } else {
            mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}


/**
 * 删除文件夹
 */
var delDir2 = function (path) {

    var files = [];

    if (fs.existsSync(path)) {

        files = fs.readdirSync(path);

        files.forEach(function (file, index) {

            var curPath = path + "/" + file;

            if (fs.statSync(curPath).isDirectory()) { // recurse

                delDir2(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

};

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function (src, dst, callback) {
    // 读取目录中的所有文件/目录
    var paths = fs.readdirSync(src);
    paths.forEach(function (path) {
        if (fs.existsSync(dst) == false) mkdir(dst);
        var _src = src + '/' + path,
            _dst = dst + '/' + path;
        // readable, writable;   

        var st = fs.statSync(_src);
        // 判断是否为文件
        if (st.isFile()) {
            // 创建读取流
            //readable = fs.createReadStream( _src );
            // 创建写入流

            //writable = fs.createWriteStream( _dst );   
            // 通过管道来传输流
            //readable.pipe( writable );
            fs.writeFileSync(_dst, fs.readFileSync(_src))

        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
            exists(_src, _dst, copy);
        }
    });
    if (callback)
        callback();
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function (src, dst, callback) {

    if (fs.existsSync(dst)) {
        callback(src, dst);
    }
    else {
        fs.mkdirSync(dst);
        callback(src, dst);
    }
};


var isDir = function (p) {
    stat = fs.lstatSync(p);
    return stat.isDirectory();
};



/** 
* 移除字符串两端的空白字符 
* 
* @return {String} 
* @api public 
*/
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

/** 
* 判断是否自定类型的文件 
* 
* @param {String}filename 
* @param {String}types, 多个类型使用,号分隔，如 doc,docx,txt 
* @return {Boolean} true or false 
* @api public 
*/
var is_filetype = function (filename, types) {
    types = types.split(',');
    var pattern = '\.(';
    for (var i = 0; i < types.length; i++) {
        if (0 != i) {
            pattern += '|';
        }
        pattern += types[i].trim();
    }
    pattern += ')$';
    return new RegExp(pattern, 'i').test(filename);
};




// 对外接口
exports.copyDir = copy

exports.delDir = delDir2

exports.existsDir = exists

exports.isDirectory = isDir

exports.mkdirSync = mkdir

exports.is_filetype = is_filetype