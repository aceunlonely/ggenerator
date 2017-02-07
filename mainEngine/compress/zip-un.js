var fs =require("fs")
var unzip=require("unzip")

exports.run=function(orgin,target)
{

	var steam = fs.createReadStream(orgin)
	
	
	//??
	steam.pipe(unzip.Extract({ path: target}));
};
