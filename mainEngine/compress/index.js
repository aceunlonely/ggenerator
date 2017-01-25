//console.log('here is compress')

var zip =require('./zip-co')
var unzip =require('./zip-un')


exports.zip=function(src,tgt,achTgt,errFn)
{
	zip.run(src,tgt,achTgt,errFn);
};


exports.unzip=function(src,tgt)
{
	unzip.run(src,tgt);
};
