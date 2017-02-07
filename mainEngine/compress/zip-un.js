var fs =require("fs")
var unzip=require("unzip")

exports.run=function(orgin,target,callback)
{

	var temp = unzip.Extract({ path: target})
	
	if(callback) temp.on('close',callback)
	//??
	fs.createReadStream(orgin).pipe(temp);
};
