## make the dir (like templatePackages/test) like
|--Config
    |--index.json
|--Ext
    |--index.json
|--TemplateFiles
    ..
|--Workspace
    ..



## Config/index.json 
    {
    "version" : "0.0.1",
    "company" : "超级高手集合"
    }

## Ext/index.json  is for ext for engine
    // should be a map
    var _templateEngineExt= {};


    _templateEngineExt.firstLowerCase = function(A){
        return A.replace(/(\w)/,function(v){return v.toLowerCase()});
    }



    // this is for templateEngine Ext to register
    exports.templateEngineExt = _templateEngineExt;


## TemplateFiles/*   is for ref file  
    in this dir, you can put any files, all files can be used in a fom file
    you can also put fom in this dir

## Workspace/*   is for workplace
    you can put any files in it, and we will generate form this files
    if the file is a pom file ,we will execute it by fom meaning
    finally ,we will render all files

## how to make fom file
    <?xml version="1.0" encoding="UTF-8" ?>
    <FOM>
        {@each ddata.gf as g, index}
        <NODE>
        <SOURCE>gf.txt</SOURCE>
        <TARGET>${g.name}.txt</TARGET>
        <DATA>ddata.gf[${index}]</DATA>
        </NODE>
        {@/each}
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
            <TARGET>readme_${ddata.name}.md</TARGET>
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


    you can make a dynamic fom by template pattern 

    <SOURCE>gf.txt</SOURCE>  means gf.txt from TemplateFiles dir by operation COPY , when operation is RENAME or DELETE means from Workspace
    <OPERATE>RENAME</OPERATE>  means operation is rename(COPY,DELETE,RENAME) , copy is default operation
    <SOURCE>$d/import.xls</SOURCE> means import.xls from ddate/FileCollection 
    <SOURCE>./orgin.xls</SOURCE>  means orgin.xls from real Workspace dir


PS: template engine object has these objects (use like :${ddata.name} )
        data :  data is an object from <DATA>
        tConfig : tConfig is an object from template's Config dir, we load it via require('templatePath/Config')
        tc:  tc is short for tConfig
        dConfig : dConfig is an object from dynamic's Config dir, we load it via require('DDataPath/Config')
        dc : dc is short for dConfig
        ddata: dConfig is an object from dynamic's Config dir, we load it via require('DDataPath/DataObject')
        d : d is short for ddate