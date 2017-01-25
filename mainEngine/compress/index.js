//console.log('here is compress')

var zip =require('./zip-co')
var unzip =require('./zip-un')


exports.zip=function(src,tgt)
{
	zip.run(src,tgt);
};


exports.unzip=function(src,tgt,errFn)
{
	unzip.run(src,tgt,errFn);
};
