<gg[#]> help

<gg[#]><gg[#]> dir structure
    |--Config
        |--index.json
    |--Ext
        |--index.js
    |--TemplateFiles
        ..
    |--Workspace
        ..

<gg[#]><gg[#]> en
<gg[#]><gg[#]><gg[#]>    Config: templateConfigJson. 
         you can use this config in template files or fom by [tConfig] or [tc]
        example:
            Config/index.json:
                {
                    "name" : "1154"
                }
            Workspace/test.txt:
                your tConifg.name is <gg[$]>{tc.name}
<gg[#]><gg[#]><gg[#]>    Ext: ext methods for template

        example:
            Ext/index.js:
```js
// should be a map
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
```
            Workspace/test.txt:
                your ext method invoke :  <gg[$]>{tc.name|testOneParam}
                {<gg[@]>if testTwoParam("1",tc.name)}
                    tc.name equels 1
                {<gg[@]>/if}


<gg[#]><gg[#]><gg[#]> TemplateFiles: an dir stores files, you can use files in .fom 

<gg[#]><gg[#]><gg[#]> Workspace : work space , gg will only execute the .fom and render files here
    you can put any files in it, and we will generate form this files
    if the file is a fom file ,we will execute it by fom meaning
    finally ,we will render all files


<gg[#]><gg[#]> 中文说明
    暂略


<gg[#]><gg[#]> fom
    fom is short for file object model , actually is a file which name end with .fom
    its content like:
```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    <FOM>
        {<gg[@]>each ddata.gf as g, index}
        <NODE>
        <SOURCE>gf.txt</SOURCE>
        <TARGET><gg[$]>{g.name}.txt</TARGET>
        <DATA>ddata.gf[<gg[$]>{index}]</DATA>
        </NODE>
        {<gg[@]>/each}
         <NODE>
        <SOURCE>gf.fom</SOURCE>
        <TARGET>gf/gf.fom</TARGET>
        </NODE>
        <NODE>
            <SOURCE>hobby.fom</SOURCE>
            <TARGET>hobby/hobby.fom</TARGET>
        </NODE>
        <NODE>
            <SOURCE>./readme.md</SOURCE>
            <TARGET>readme_<gg[$]>{ddata.name}.md</TARGET>
            <OPERATE>RENAME</OPERATE>
        </NODE>

        <NODE>
            <SOURCE>$d/addFile.txt</SOURCE>
            <TARGET>addFile.txt</TARGET>
            <OPERATE>COPY</OPERATE>
        </NODE>
        <NODE>
        <SOURCE>$d/import.xls</SOURCE>
        <TARGET>templates/import.xls</TARGET>
        </NODE>
        <NODE>
        <TARGET>del.xls</TARGET>
        <OPERATE>DELETE</OPERATE>
        </NODE>
        <NODE>
        <SOURCE>./orgin.xls</SOURCE>
        <TARGET>new.xls</TARGET>
        <OPERATE>RENAME</OPERATE>
    </FOM>
```

    you can make a dynamic fom by template pattern 

    <SOURCE>gf.txt</SOURCE>  means gf.txt from TemplateFiles dir by operation COPY , when operation is RENAME or DELETE means from Workspace
    <OPERATE>RENAME</OPERATE>  means operation is rename(COPY,DELETE,RENAME,COPYDIR) , copy is default operation
        OPERATES:
            COPY(C for short):  child NODE 'SOURCE'(S) 'TARGET'(T) is need,  
                SOURCE can be start with './'，'$d/' or ''
                    './' means find your file in current workspace
                    '$d/' means find your file in dynamicPath
                    '' means find your file in templatePath
                TARGET can be start with '../' or ''
                    '../' means previous directory on the path of fom
                    '' means the root dir of workspace
            DELETE(D for short): child NODE 'TARGET'(T) is need
            RENAME(R for short): child NODE 'SOURCE'(S) 'TARGET'(T) is need
            COPYDIR(CD for short): just like COPY

    <SOURCE>$d/import.xls</SOURCE> means import.xls from ddate/FileCollection 
    <SOURCE>./orgin.xls</SOURCE>  means orgin.xls from real Workspace dir