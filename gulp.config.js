var app_js_files = [
    'public/app/controllers/app.js',
    'public/app/controllers/masterController.js',
    'public/app/controllers/searchFormController.js',
    'public/app/controllers/memberResultController.js',
    'public/app/controllers/quickLinksController.js',
    'public/app/directives/directive.js',
    'public/app/services/masterService.js',
    'public/app/services/services.js',
    'public/app/constants/constants.js'
]

var vendor_js_files = [
    'public/lib/bower/jquery/dist/jquery.min.js',
    'public/lib/bower/angular/angular.min.js',
    'public/lib/bower/bootstrap/dist/js/bootstrap.min.js',
    'public/lib/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'public/lib/bower/angular-ui-router/release/angular-ui-router.min.js',
    'public/lib/bower/at-table/dist/angular-table.min.js',
    'public/lib/bower/ngstorage/ngStorage.min.js',
    'public/lib/bower/lodash/dist/lodash.core.min.js',
    'public/lib/bower/lodash/dist/lodash.min.js',
    'public/lib/bower/angular-spinner/dist/angular-spinner.min.js',
    'public/lib/js/angular-animate.min.js'
]


var app_css_files = [
    'public/app/styles/style.css',
    'public/app/styles/mainPage.css'
]

module.exports = {
    APP_JS: app_js_files,
    VENDOR_JS: vendor_js_files,
    APP_CSS: app_css_files
}
