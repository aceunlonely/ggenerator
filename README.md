#ggenerator

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
* node run.js -d F:\test\ggenerator/d.zip -p test -t F:\test\ggenerator\tgt -w 工作目录 --debug false
* node run.js -o addTemplate -d F:\test\ggenerator/d.zip  -p test2

### as npm package
* add ggenerate to your node_modules
* required('ggenerate').run(dDataPath,template,targetPath,workplace,callback)

## how to make a template
* read doc/howToMakeTemplate.md for details

## how to make a ddate
* read doc/howToMakeDData.md for details

## ide
* vs code or vi 


## node env 
* v6.2.2