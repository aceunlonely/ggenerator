
// this is will be run after uiddata.json
exports= module.exports = new Promise(function (resolve, reject) {
    
    setTimeout(() => {
        console.log("wait 2 secs")
        resolve("result")
    }, 2000);
    
})