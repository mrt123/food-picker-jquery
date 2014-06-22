require.config({
    paths: {
        jquery: '../js/libs/jquery-1.10.2',
        text: '../js/libs/plugins/text',
        async: '../js/libs/plugins/async',
        handlebars: '../js/libs/handlebars-v1.1.2',
        angular: '../js/libs/angular',
        chosen: 'libs/chosen_v1.1.0/chosen.jquery'
    },
    shim: {
        'handlebars': {
            exports: 'handlebars'
        },
        'angular': {
            exports: 'angular'
        },
        'chosen': {
            deps: ['jquery'],
            exports: 'chosen'
        }
    }
});

//redefine jquery module to remove jquery globals.
define('jquery-no-conflict', ['jquery'], function (jq) {
    return jq.noConflict( true );
});


// define js dependencies for entire application.
require(
    [
        "../js/libs/less-1.3.3.min",
        "jquery",
        "chosen",
        "app"
    ],
    function(less, $, chosen, app){}
);
