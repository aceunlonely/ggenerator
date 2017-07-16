var fs = require('fs');
var archiver = require('archiver');

function innerErrFn(err)
{
	throw err;
}

/**
 * source  压缩原文件路径  如 /root/test  or  ../test/  or test.txt or test/
 * target  压缩目标路径  如 /root/test.zip  or test.zip
 * achTgt  压缩文件中路径   如 ../ or test/ 
 * errfn   错误函数 
 */
exports.run = function(source,target,achTgt,errfn,successFn)
{
	var output = fs.createWriteStream(target);
	var archive = archiver('zip');

	if(successFn)
	{
		output.on('close', successFn);
	}
	
	if(errfn)
	{
		archive.on('error',errfn);
	}	
	else
	{
		archive.on('error',innerErrFn);
	}
	
	archive.pipe(output);
	//archive.bulk([{ src: [source]}]);
	//archive.glob('*')
	if(!achTgt)
	{
		achTgt='../';
	}
	archive.directory(source,achTgt);
	archive.finalize();
};
