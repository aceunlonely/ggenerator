var compress = require('./compress')





//compress.unzip('d:/test/test.zip','d:/test/test2')


exports.run =function (params) {
    //do something
}


exports.test=function (params) {
    console.log('test running..')
    switch(params){
        case 'compress':
            compress.zip('test/demo001','test/test.zip')
        break;


        default:
        break;

    }
    console.log('test terminated')
}