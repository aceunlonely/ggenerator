1、现在的模板引擎默认是juicer，能否扩展？
    理论上可以，扩展templateEngine/index 就可以

2、如何输出如 ${dolloer} 这种与模板引擎冲突的文本?
    可以使用最终替换实现： 
        1、设置template/Ext 扩展   详见howToMakeTemplate.md/Ext/index.js
        2、书写格式如：   <gg[]>   (  $<gg[]>{dolloer}  或者 $<gg[{dolloer}]>  随意都可以 )

3、有些.fom文件不想进行fom处理，怎么办
    在Template/Config json中添加以下节点：
    "fom" :{
        "ignore" : ["fom名字.fom"]
    }

4、error:  ReferenceError: document is not defined
        you shall annotate the part code in juicer.js:
        // if(args[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
        //     args[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function($, $id) {
        //         var _document = document;
        //         var elem = _document && _document.getElementById($id);
        //         args[0] = elem ? (elem.value || elem.innerHTML) : $;
        //     });
        // }