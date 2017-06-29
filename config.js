var config = {
    "local": {
        "environment": "local",
        "url": "https://api-int-stg.uhc.com:8444",
        "findIndividual": "/api/alpha/eisl/individuals/v2.0/search",
        "findMembership": "/api/alpha/eisl/individuals/membership/v2.0/search",
        "getMembership": "/api/alpha/eisl/individuals/membership/v2.0/read",
        "getMemberFamily": "/api/alpha/eisl/individuals/memberfamily/v2.0/read",
        "findEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/search",
        "getEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/read",
        "getSubscriptionServiceBenefit": "/api/alpha/eisl/benefits/servicebenefit/v2.0/read",
        "getBenefitAccumulator": "/api/alpha/eisl/benefits/benefitaccumulator/v2.0/read",
        "getBenefitLanguage": "/api/alpha/eisl/benefits/benefitlanguage/v2.0/read",
        "getDocument": "/api/alpha/eisl/documents/v2.0/read",
        "token": {
            "url": "https://api-int-stg.uhc.com:8443/auth/oauth/v2/token",
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials",
        },

        "MONGODB_SERVICE_HOST": "localhost",
        "MONGODB_SERVICE_PORT_MONGO": "27017",
        "MONGODB_DATABASE": "benefitSearchDB",
        "MONGODB_DATABASE_LOGS": "BEACH_LOGS",
        "MONGODB_COLLECTION": "local",
        "MONGODB_COLLECTION_LINKS": "links",
        "MONGODB_COLLECTION_TOKEN": "local",
        "logging" : {
            "file_logging": {
              "file_logging_enabled": true,
              "all_log_enabled": true,
              "all_log_level": "debug",
              "info_log_enabled": true,
              "info_log_level": "info",            
              "error_log_enabled": true,
              "error_log_level": "error"
            },
            "db_logging": {
              "db_logging_enabled": true,
              "db_url": "mongodb://localhost:27017/BEACH_LOGS",
             //   "db_url": "mongodb://beach_logs:beachlogs1234@apsrd8988.uhc.com:27017,apsrd8989.uhc.com:27017,apsrd8990.uhc.com:27017/beach-logs?replicaSet=rd0",
              //"db_url" : "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT_MONGO + "/" + process.env.MONGODB_DATABASE_LOGS,
              "all_log_enabled": true,
              "all_log_level": "debug",
              "info_log_enabled": true,
              "info_log_level": "info",
              "error_log_enabled": true,
              "error_log_level": "error"
            },
            "console_logging":{
              "console_logging_enabled":true,
              "console_log_level":"debug"
            }
        }

    },
    "development": {
        "environment": "development",
        "url": "https://api-int-stg.uhc.com:8444",
        "findIndividual": "/api/alpha/eisl/individuals/v2.0/search",
        "findMembership": "/api/alpha/eisl/individuals/membership/v2.0/search",
        "getMembership": "/api/alpha/eisl/individuals/membership/v2.0/read",
        "getMemberFamily": "/api/alpha/eisl/individuals/memberfamily/v2.0/read",
        "findEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/search",
        "getEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/read",
        "getSubscriptionServiceBenefit": "/api/alpha/eisl/benefits/servicebenefit/v2.0/read",
        "getBenefitAccumulator": "/api/alpha/eisl/benefits/benefitaccumulator/v2.0/read",
        "getBenefitLanguage": "/api/alpha/eisl/benefits/benefitlanguage/v2.0/read",
        "getDocument": '/api/alpha/eisl/documents/v2.0/read',
        "token": {
            "url": "https://api-int-stg.uhc.com:8443/auth/oauth/v2/token",
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials",
        },
        "adminAccessADGroup": ['BASE_UI_Admin_QuickLinks'],
        "memberAccessADGroup": ['icuegrp', 'icuegrpp'],
        "MONGODB_DATABASE": "benefitSearchDB",
        "MONGODB_COLLECTION_TOKEN": "DEVELOPMENT",
        "MONGODB_COLLECTION_LINKS": "LINKS",
        "logging" : {
            "file_logging": {
                "file_logging_enabled": true,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "db_logging": {
                "db_logging_enabled": true,
                "db_url" : "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT_MONGO + "/" + process.env.MONGODB_DATABASE,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "console_logging":{
                "console_logging_enabled":true,
                "console_log_level":"info"
            }
        }
    },
    "test": {
        "environment": "test",
        "url": "https://api-int-stg.uhc.com:8444",
        "findIndividual": "/api/bravo/eisl/individuals/v2.0/search",
        "findMembership": "/api/bravo/eisl/individuals/membership/v2.0/search",
        "getMembership": "/api/bravo/eisl/individuals/membership/v2.0/read",
        "getMemberFamily": "/api/bravo/eisl/individuals/memberfamily/v2.0/read",
        "findEmployerGroup":"/api/bravo/eisl/organizations/employergroups/v2.0/search",
        "getEmployerGroup":"/api/bravo/eisl/organizations/employergroups/v2.0/read",
        "getSubscriptionServiceBenefit": "/api/bravo/eisl/benefits/servicebenefit/v2.0/read",
        "getBenefitAccumulator": "/api/bravo/eisl/benefits/benefitaccumulator/v2.0/read",
        "getBenefitLanguage": "/api/bravo/eisl/benefits/benefitlanguage/v2.0/read",
        "getDocument": '/api/bravo/eisl/documents/v2.0/read',
        "token": {
            "url": "https://api-int-stg.uhc.com:8443/auth/oauth/v2/token",
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials"
        },
        "adminAccessADGroup": ['BASE_UI_Admin_QuickLinks', 'BASE_UI_Admin_Jenkins'],
        "memberAccessADGroup": ['icuegrp', 'icuegrpp', 'BASE_UI_Admin_Jenkins'],
        "MONGODB_COLLECTION_TOKEN": "TEST",
        "MONGODB_DATABASE": "benefitSearchDB",
        "MONGODB_COLLECTION_LINKS": "LINKS",
        "logging" : {
            "file_logging": {
                "file_logging_enabled": true,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "db_logging": {
                "db_logging_enabled": true,
                "db_url" : "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT_MONGO + "/" + process.env.MONGODB_DATABASE,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "console_logging":{
                "console_logging_enabled":true,
                "console_log_level":"info"
            }
        }
    },
    "stage": {
        "environment": "stage",
        "url": "https://api-int-stg.uhc.com:8444",
        "findIndividual": "/api/alpha/eisl/individuals/v2.0/search",
        "findMembership": "/api/alpha/eisl/individuals/membership/v2.0/search",
        "getMembership": "/api/alpha/eisl/individuals/membership/v2.0/read",
        "getMemberFamily": "/api/alpha/eisl/individuals/memberfamily/v2.0/read",
        "findEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/search",
        "getEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/read",
        "getSubscriptionServiceBenefit": "/api/alpha/eisl/benefits/servicebenefit/v2.0/read",
        "getBenefitAccumulator": "/api/alpha/eisl/benefits/benefitaccumulator/v2.0/read",
        "getBenefitLanguage": "/api/alpha/eisl/benefits/benefitlanguage/v2.0/read",
        "getDocument": '/api/alpha/eisl/documents/v2.0/read',
        "token": {
            "url": "https://api-int-stg.uhc.com:8443/auth/oauth/v2/token",
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials"
        },
        "adminAccessADGroup": ['BASE_UI_Admin_QuickLinks'],
        "memberAccessADGroup": ['icuegrp', 'icuegrpp'],
        "MONGODB_COLLECTION_LINKS": "links",
        "MONGODB_COLLECTION_TOKEN": "stage",
        "logging" : {
            "file_logging": {
                "file_logging_enabled": true,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "db_logging": {
                "db_logging_enabled": true,
                "db_url" : "mongodb://" + process.env.MONGODB_LOGGING_USERNAME + ":" + process.env.MONGODB_LOGGING_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT_MONGO + "/" + process.env.MONGODB_DATABASE_LOGS,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "console_logging":{
                "console_logging_enabled":true,
                "console_log_level":"info"
            }
        }
    },
    "production": {
        "environment": "production",
        "url": "https://api-int-stg.uhc.com:8444",
        "findIndividual": "/api/alpha/eisl/individuals/v2.0/search",
        "findMembership": "/api/alpha/eisl/individuals/membership/v2.0/search",
        "getMembership": "/api/alpha/eisl/individuals/membership/v2.0/read",
        "getMemberFamily": "/api/alpha/eisl/individuals/memberfamily/v2.0/read",
        "findEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/search",
        "getEmployerGroup":"/api/alpha/eisl/organizations/employergroups/v2.0/read",
        "getSubscriptionServiceBenefit": "/api/alpha/eisl/benefits/servicebenefit/v2.0/read",
        "getBenefitAccumulator": "/api/alpha/eisl/benefits/benefitaccumulator/v2.0/read",
        "getBenefitLanguage": "/api/alpha/eisl/benefits/benefitlanguage/v2.0/read",
        "getDocument": '/api/alpha/eisl/documents/v2.0/read',
        "token": {
            "url": "https://api-int-stg.uhc.com:8443/auth/oauth/v2/token",
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials"
        },
        "adminAccessADGroup": ['BASE_UI_Admin_QuickLinks'],
        "memberAccessADGroup": ['icuegrpp'],
        "MONGODB_DATABASE": "benefitSearchDB",
        "MONGODB_DATABASE_LOGS": "BEACH_LOGS",
        "MONGODB_COLLECTION_TOKEN": "production",
        "MONGODB_COLLECTION_LINKS": "LINKS",
        "logging" : {
            "file_logging": {
                "file_logging_enabled": true,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "db_logging": {
                "db_logging_enabled": true,
                "db_url" : "mongodb://" + process.env.MONGODB_LOGGING_USERNAME + ":" + process.env.MONGODB_LOGGING_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT_MONGO + "/" + process.env.MONGODB_DATABASE_LOGS,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "console_logging":{
                "console_logging_enabled":true,
                "console_log_level":"info"
            }
        }
    },
    "offline": {
        "environment": "offline",
        "url": "https://api-int-stg.uhc.com:8444",
        "findIndividual": require('./resources/offlineJsonFiles/findIndividual.json'),
        "findMembership": require('./resources/offlineJsonFiles/findMembership.json'),
        "getMembership": require('./resources/offlineJsonFiles/getMembership.json'),
        "getMemberFamily": require('./resources/offlineJsonFiles/getMemberFamily.json'),
        "findEmployerGroup":require('./resources/offlineJsonFiles/findEmployerGroup.json'),
        "getEmployerGroup":require('./resources/offlineJsonFiles/getEmployerGroup.json'),
        "getSubscriptionServiceBenefit": require('./resources/offlineJsonFiles/getSubscriptionServiceBenefit.json'),
        "getBenefitAccumulator": require('./resources/offlineJsonFiles/getBenefitAccumulator.json'),
        "getBenefitLanguage": require('./resources/offlineJsonFiles/getBenefitLanguage.json'),
        "getDocument": require('./resources/offlineJsonFiles/getDocument.json'),
        "token": {
            "url": "https://api-int-stg.uhc.com:8443/auth/oauth/v2/token",
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials"
        },
        "MONGODB_SERVICE_HOST": "localhost",
        "MONGODB_SERVICE_PORT_MONGO": "27017",
        "MONGODB_DATABASE": "benefitSearchDB",
        "MONGODB_COLLECTION": "offline",
        "MONGODB_DATABASE_LOGS": "BEACH_LOGS",
        "MONGODB_COLLECTION_LINKS": "links",
        "logging" : {
            "file_logging": {
                "file_logging_enabled": true,
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "db_logging": {
                "db_logging_enabled": true,
                "db_url": "mongodb://localhost:27017/BEACH_LOGS",
                "all_log_enabled": true,
                "all_log_level": "debug",
                "info_log_enabled": true,
                "info_log_level": "info",
                "error_log_enabled": true,
                "error_log_level": "error"
            },
            "console_logging":{
                "console_logging_enabled":true,
                "console_log_level":"debug"
            }
        }
    }
}

exports.get = function(env) {
    if (typeof(env) != 'undefined') {
        env = env.toLowerCase();
        // console.log('env is ' + env);
    }
    return config[env] || config.production;
}
