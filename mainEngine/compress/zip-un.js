var fs =require("fs")
var unzip=require("unzip")

exports.run=function(orgin,target)
{
	fs.createReadStream(orgin).pipe(unzip.Extract({ path: target}));
};
