## how to make fom file

```xml
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
```

```xml
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
```

PS: template engine object has these objects (use like :${ddata.name} )
        data :  data is an object from <DATA>
        tConfig : tConfig is an object from template's Config dir, we load it via require('templatePath/Config')
        tc:  tc is short for tConfig
        dConfig : dConfig is an object from dynamic's Config dir, we load it via require('DDataPath/Config')
        dc : dc is short for dConfig
        ddata: dConfig is an object from dynamic's Config dir, we load it via require('DDataPath/DataObject')
        d : d is short for ddate

    data.orignString : data.orignString is the string value from <DATA>
    data.toString :  data.toString === data.orignString 