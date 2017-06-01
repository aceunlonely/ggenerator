
// should be a map
var _templateEngineExt= {};


_templateEngineExt.firstLowerCase = function(A){
     return A.replace(/(\w)/,function(v){return v.toLowerCase()});
}



// this is for templateEngine Ext to register
exports.templateEngineExt = _templateEngineExt;