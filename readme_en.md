# ggenerator

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
```bash
npm i ggenerator.js -g
```

## how to use 
### cli
```bash
gg -h
```

### as npm package
```js
require('ggenerator.js').run(dDataPath,template,targetPath,workplace,callback)
```

## how to make a template package
```bash
gg empty
```

## how to make a ddate package
```bash
gg empty
```

## what is uiddata
when you use comboTemplate(of course not only ct),ddata is in the template.  
we must need change some data,it is uiddta  
details @ [doc/uiddata.md](doc/uiddata.md)

## config
```bash
gg config
```


## details
    all details in doc/*

## Q&A
[QA.md](QA.md)


## how to share templates Package
use git to share  
```bash
git clone https://github.com/aceunlonely/ggenerator-templates
cd ggenerator-templates
gg config
```

## use  history
```bash
npm i -g history.node
```
```bash
hist
hist -h
# run last
hist last
```