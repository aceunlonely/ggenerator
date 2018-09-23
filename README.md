#ggenerator

## i wanna tell you that

1. what is gg(ggenerator)
    it is designed as a code generator to generate code by one data and a template,
    generating file content is easy using template engine like juicer .....
    but files are different, then i designed a structure named fom (file object model)
    to generate diff files, we can define diffenret fom ,like @ demo.fom
    after all,all tgt files can be generated by just data and template

2. then i think of
    more useful
    easier to use
    store our template in one center
    easier to generator ddata

after all,ggenerator is an engine to run your mind, to complete your task
    you shall change your mind that how to use software to complete your task,
        you shall use template idea ,never a whole sealed system

and more in examples:
...


## how to install 
* of course  npm install 
* cd directories to npm install (mainEngine , mainEngine/compress , mainEngine/templageEngine )
* // copy dirs in node_modules_git to node_modules

## how to test 
* node test.js -t compress
* node test.js -t template_content
* node test.js -t template_file
* node test.js -t fs
* node test.js -t fom

## how to use 
### cli
* cd [workspace]
* node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt --debug false
* node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt -w F:\test\ggenerator\workspace --debug false
* node run.js -d F:\temp\ggenerator/ddata.zip -p test -t F:\temp\ggenerator\tgt -w F:\temp\ggenerator\wp -u false
* node run.js -o addTemplate -d F:\test\ggenerator/d.zip  -p test2

### as npm package
* add ggenerate to your node_modules
* require('ggenerator').run(dDataPath,template,targetPath,workplace,callback)

## how to make a template package
* read doc/howToMakeTemplate.md for details
```
structure:
    |--Config
    |--index.json
    |--Ext
        |--index.js
    |--TemplateFiles
        ..
    |--Workspace
        ..
```
## how to make a ddate package
* read doc/howToMakeDData.md for details
```
structure:
    |--Config
        |--index.js
    |--DataObject
        |--index.json
    |--FileCollection
        ..
```

## what is comboTemplate
* when ddata is fixed or get from other place(like get form a webapi) , you can put ddata into template

```
structure:
    |--Config
    |--index.json
    |--Ext
        |--index.js
    |--TemplateFiles
        ..
    |--Workspace
        ..
    |--TDData
        |--Config
            |--index.js
        |--DataObject
            |--index.json
        |--FileCollection
            ..
```
## what is uiddata
when you use comboTemplate(of course not only ct),ddata is in the template.
we must need change some data,it is uiddta
details @ doc/uiddata.md

## ide
* vs code or vi 


## node env 
* v6.2.2+

## config
all config in ./config.json
