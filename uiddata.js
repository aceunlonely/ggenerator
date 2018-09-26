var ioc = require('peeriocjs').module("gg-engine")
var fs = require('fs')
var path = require('path')
var uicli = require('uicli.js')
// here implement of dynamic ddata
// we will resolve the DataObject 


// uiddata.json
// uiddata.js

/**
 * pre main Executing
 */
ioc.reg("preMainExecuting",function(env){
    var ddataPath = path.join(env.dynamicRootPath,'DataObject')
    console.log("aaa :" + ddataPath)
    return new Promise(function(r,j){
        function runUiddataJs(){
            if(fs.existsSync(path.join(ddataPath,"uiddata.js"))){
                r(require(path.join(ddataPath,"uiddata.js")))
            }
            else{
                r()
            }
        }
        
        if(fs.existsSync(path.join(ddataPath,"uiddata.json"))){
            var jsonStr = fs.readFileSync(path.join(ddataPath,"uiddata.json"))
            var json = JSON.parse(jsonStr)
            uicli.uiGetJson(json).then(realJson=>{
                fs.writeFileSync(path.join(ddataPath,"uiddata.json"),JSON.stringify(realJson))
                runUiddataJs()
            })
        }
        else
        {
            runUiddataJs()
        }
    })
})