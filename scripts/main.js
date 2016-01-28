var requirejs = require('requirejs');

requirejs.config({
	shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        "jquery" : "//code.jquery.com/jquery-2.1.1.min",
        "bootstrap" :  "//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min"  
    },
    nodeRequire: require
});


requirejs(['jquery', 'bootstrap', 'prettify'], function($){

    // DOM ready
    $(function(){

        // Twitter Bootstrap 3 carousel plugin
    });
});



