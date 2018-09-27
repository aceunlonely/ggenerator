var _templateEngineExt= {};

_templateEngineExt.testOneParam = function(v){
    if(v == "true")
        return "yes";
    return "no";
}

_templateEngineExt.testTwoParam = function(o,t){
    return o==t;
}

_templateEngineExt.firstLowerCase = function(A){
    return A.replace(/(\w)/,function(v){return v.toLowerCase()});
}

// this is for templateEngine Ext to register
exports.templateEngineExt = _templateEngineExt;