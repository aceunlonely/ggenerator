<gg[#]> where is uiddata

|--Config
    |--index.js
|--DataObject
    |--index.json
    |--uiddata.json
    |--uiddata.js
|--FileCollection
    ..


<gg[#]> what in uiddata
nornal like:
<gg[#]><gg[#]> uiddata.json
```javascript
{
    "name" : "???(string)[rue]这里填写你的名字",
    "age" : "???",
    "isMan" : "???",
    "hobby": "basketball",
    "lover" : {
        "name" : "LiSA",
        "age" : 32,
        "???" : null,
        "json1":"????"
    },
    "???": null,
    "json2": "???"
}
```
<gg[#]><gg[#]> uiddata.js
```javascript
// write any sync code as you like
console.log("here is uiddata logic")

//if you wanna write async code, youd better return a Promise like 
exports= module.exports = new Promise(function (resolve, reject) {resolve("result")})

// also you can get data from a webapi
var request = require('request');
var r = function(){
    request('http://www.baidu.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) 
    resolve(body)
    // and so on
  }
})
}

```

<gg[#]><gg[#]> how it work
uiddata engine will render uiddata.json and run uiddata.js
uiddata.json: ??? will need your input
    1. ue(uiddata engine) will ask you like 
        'pliz input your name: string 这里填写你的名字
         name : (rue)'
    2. you can input like(choose one)
        a.    (string)apporoad  
        b.    (number)100 
        c.    (boolean)true
        d.    (null)null
        e.    (json){"name":"apporoad","age":100}
        f.nothing to do ,direct enter
        PS: 
    3. you can also input like this:
        a.  apporoad
        b.  100
        c.  true
        d.  null
        e.  (json){"name":"apporoad","age":100}

        if you wanna input 100、 true 、 null as string
            you shall input like (string)100
    4.  you can also use short pattern
        s:string
        j:json

    5. then ue will ask you about : age、isMan
    6. then when ue went @ lover.??? ,it will ask you like 'pliz input your lover.??? key(:ignore or :i means pass this)'
    7. after you input your key ,then will ask you the value
    8. then ue will continue ask your key... until you ignore it 
    9. then went to node : lover.json1
    10. then be omitted

<gg[#]><gg[#]> lets try it
    you can try it @ uicli.js