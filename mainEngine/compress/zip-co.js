var fs = require('fs');
var archiver = require('archiver');

function innerErrFn(err)
{
	throw err;
}

exports.run = function(source,target,errfn)
{
	var output = fs.createWriteStream(target);
	var archive = archiver('zip');
	
	if(errfn)
	{
		archive.on('error',errfn);
	}	
	else
	{
		archive.on('error',innerErrFn);
	}
	
	archive.pipe(output);
	archive.bulk([{ src: [source]}]);
};
