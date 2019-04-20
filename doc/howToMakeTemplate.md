demo in [ggenerator-templates](https://github.com/aceunlonely/ggenerator-templates)

## make the dir (like templatePackages/test) like

```bash
|--Config
    |--index.json
|--Ext
    |--index.js
|--TemplateFiles
    ..
|--Workspace
    ..
```

## Config/index.json 
```json
{
"version" : "0.0.1",
"company" : "超级高手集合"
}
```

## Ext/index.js  is for ext for engine  扩展方法
```js
// should be a map
var _templateEngineExt= {};

// ext functions 扩展函数，模板中使用
_templateEngineExt.firstLowerCase = function(A){
    return A.replace(/(\w)/,function(v){return v.toLowerCase()});
}

...

// this is for templateEngine Ext to register
exports.templateEngineExt = _templateEngineExt;
```


## TemplateFiles/*   is for ref file   被引用文件
    in this dir, you can put any files, all files can be used in a fom file
    you can also put fom in this dir
    在这个文件夹中，可以防止任何文件，不会被生成，但能被fom中定义的节点操作
    你也可以将fom文件放在这里

## Workspace/*   is for workplace  工作目录
    you can put any files in it, and we will generate form this files
    if the file is a pom file ,we will execute it by fom meaning
    finally ,we will render all files
    这个目录是放置目标文件的，所有的文件都会生成到最终文件夹中，文本文档会被模板引擎渲染为最终文件
    而fom，会被解析，生成动态文件



​    