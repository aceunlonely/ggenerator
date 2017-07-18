//console.log('here is compress')

var zip =require('./zip-co')
var unzip =require('./zip-un')


exports.zip=function(src,tgt,achTgt,errFn,successFn)
{
	zip.run(src,tgt,achTgt,errFn,successFn);
};


exports.unzip=function(src,tgt,callback)
{
	unzip.run(src,tgt,callback);
};
