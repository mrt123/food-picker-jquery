require.config({
    paths: {
        jquery: '../js/libs/jquery-1.10.2',
        text: '../js/libs/plugins/text',
        async: '../js/libs/plugins/async',
        handlebars: '../js/libs/handlebars-v1.1.2',
        angular: '../js/libs/angular'
    },
    shim: {
        'handlebars': {
            exports: 'handlebars'
        },
        'angular': {
            exports: 'angular'
        }
    }
});

// redefine jquery module to remove jquery globals.
define('jquery-no-conflict', ['jquery'], function (jq) {
    return jq.noConflict( true );
});




// define all js dependencies for entire application.
require(
    [
        "../js/libs/less-1.3.3.min",
        "jquery",
        "app"
    ],
    function(less, $, app) {

    console.log("config executed");
});
