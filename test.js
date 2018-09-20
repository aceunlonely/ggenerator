require('./config')
//var me = require('./mainEngine')
var me = require('ggenerator-engine')

var program = require('commander');


//get params
program.version('0.0.1')
    .option('-t --test [value]','测试','null')
    .parse(process.argv);


//run test
console.log(program.test)
me.test(program.test);