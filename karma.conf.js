//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './',

        files: [
            'public/lib/bower/angular/angular.js',
            'public/lib/bower/angular-ui-router/release/angular-ui-router.js',
            'public/lib/bower/jquery/dist/jquery.min.js',
            'public/lib/bower/bootstrap/dist/js/bootstrap.min.js',
            'public/lib/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'public/lib/js/angular-mocks.js',
            'public/lib/bower/ngstorage/ngStorage.min.js',
            'public/lib/bower/at-table/dist/angular-table.min.js',
            'public/lib/bower/lodash/dist/lodash.core.min.js',
            'public/lib/bower/lodash/dist/lodash.min.js',
            'public/lib/bower/angular-spinner/dist/angular-spinner.min.js',
            'public/lib/js/angular-animate.min.js',
            'public/app/controllers/*.js',
            'public/app/constants/*.js',
            'public/app/services/*.js',
            'tests/unit-tests/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-html-reporter',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-coverage'
        ],

        reporters: ['html', 'spec', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'public/app/controllers/*.js': ['coverage'],
            'public/app/services/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'tests/unit-tests/coverage_reports'
        },

        htmlReporter: {
            outputDir: 'tests/unit-tests/jasmine_reports', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'reports', // report summary filename; browser info by default


            // experimental
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false, // reports start folded (only with preserveDescribeNesting)
        },



        singleRun: true

    });
};
