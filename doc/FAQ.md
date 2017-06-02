
# when run

* error:  ReferenceError: document is not defined
        you shall annotate the part code in juicer.js:
        // if(args[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
        //     args[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function($, $id) {
        //         var _document = document;
        //         var elem = _document && _document.getElementById($id);
        //         args[0] = elem ? (elem.value || elem.innerHTML) : $;
        //     });
        // }
