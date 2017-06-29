/**
 * Created by hnarasap on 4/14/2017.
 */

angular.module('masterApp')
    .constant('US_STATES', {
        "usState": [
            { "id": '', "name": '---- Select state ----' },
            { "id": 'AL', "name": 'AL - Alabama' },
            { "id": 'AK', "name": 'AK - Alaska' },
            { "id": 'AZ', "name": 'AZ - Arizona' },
            { "id": 'AR', "name": 'AR - Arkansas' },
            { "id": 'CA', "name": 'CA - California' },
            { "id": 'CO', "name": 'CO - Colorado' },
            { "id": 'CT', "name": 'CT - Connecticut' },
            { "id": 'DE', "name": 'DE - Delaware' },
            { "id": 'DC', "name": 'DC - District Of Columbia' },
            { "id": 'FL', "name": 'FL - Florida' },
            { "id": 'GA', "name": 'GA - Georgia' },
            { "id": 'HI', "name": 'HI - Hawaii' },
            { "id": 'ID', "name": 'ID - Idaho' },
            { "id": 'IL', "name": 'IL - Illinois' },
            { "id": 'IN', "name": 'IN - Indiana' },
            { "id": 'IA', "name": 'IA - Iowa' },
            { "id": 'KS', "name": 'KS - Kansas' },
            { "id": 'KY', "name": 'KY - Kentucky' },
            { "id": 'LA', "name": 'LA - Louisiana' },
            { "id": 'ME', "name": 'ME - Maine' },
            { "id": 'MD', "name": 'MD - Maryland' },
            { "id": 'MA', "name": 'MA - Massachusetts' },
            { "id": 'MI', "name": 'MI - Michigan' },
            { "id": 'MN', "name": 'MN - Minnesota' },
            { "id": 'MS', "name": 'MS - Mississippi' },
            { "id": 'MO', "name": 'MO - Missouri' },
            { "id": 'MT', "name": 'MT - Montana' },
            { "id": 'NE', "name": 'NE - Nebraska' },
            { "id": 'NV', "name": 'NV - Nevada' },
            { "id": 'NH', "name": 'NH - New Hampshire' },
            { "id": 'NJ', "name": 'NJ - New Jersey' },
            { "id": 'NM', "name": 'NM - New Mexico' },
            { "id": 'NY', "name": 'NY - New York' },
            { "id": 'NC', "name": 'NC - North Carolina' },
            { "id": 'ND', "name": 'ND - North Dakota' },
            { "id": 'OH', "name": 'OH - Ohio' },
            { "id": 'OK', "name": 'OK - Oklahoma' },
            { "id": 'OR', "name": 'OR - Oregon' },
            { "id": 'PA', "name": 'PA - Pennsylvania' },
            { "id": 'RI', "name": 'RI - Rhode Island' },
            { "id": 'SC', "name": 'SC - South Carolina' },
            { "id": 'SD', "name": 'SD - South Dakota' },
            { "id": 'TN', "name": 'TN - Tennessee' },
            { "id": 'TX', "name": 'TX - Texas' },
            { "id": 'UT', "name": 'UT - Utah' },
            { "id": 'VT', "name": 'VT - Vermont' },
            { "id": 'VA', "name": 'VA - Virginia' },
            { "id": 'WA', "name": 'WA - Washington' },
            { "id": 'WV', "name": 'WV - West Virginia' },
            { "id": 'WI', "name": 'WI - Wisconsin' },
            { "id": 'WY', "name": 'WY - Wyoming' }
        ]
    })

.constant('ERROR_MESSAGE', {
    "formErrorMsg": "Your entries are not completed or need to be changed. The information provided does not match our records. Please try again.",
    "findIndividual": {
        400: "Member Not Found based on your input criteria.",
        404: "Member Not Found based on your input criteria.",
        500: "Benefit Search Service is temporarily down. Please try again in a few minutes. If the issue persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you.",
    },
    "findMembership": {
        400: "Member found, however Coverage Information is not available in system for the selected coverage period.",
        404: "Member found, however Coverage Information is not available in system for the selected coverage period.",
        500: "Member found, however Coverage Information is not currently available in system. Please try again in a few minutes. If the issue persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getMembership": {
        400: "Membership not found based on your input criteria.  Please try your search again with valid criteria",
        404: "Membership not found based on your input criteria.  Please try your search again with valid criteria",
        500: "Member found, however Benefit Information is not currently available in system. Please try again in a few minutes. If the issue persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getSubscriptionServiceBenefit": {
        400: "Subscription information not found based on your search criteria. Please try your search again with valid criteria",
        404: "Subscription information not found based on your search criteria. Please try your search again with valid criteria",
        500: "Service is down, Riders information is currently not available. Please try your search again in a few minutes. If problem persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getMemberFamily": {
        400: "Family Members information not found based on your search criteria. Please try your search again with valid criteria",
        404: "Family Members information not found based on your search criteria. Please try your search again with valid criteria",
        500: "Service is down, Family Members information are currently not available. Please try your search again in a few minutes. If problem persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getBenefitLanguage": {
        400: "Benefit Language information not found based on your input criteria. Please try your search again with valid criteria",
        404: "Benefit Language information not found based on your input criteria. Please try your search again with valid criteria",
        500: "Service is down, Benefit Language information is currently not available. Please try your search again in a few minutes. If problem persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getBenefitAccumulator": {
        400: "Benefit Accumulator information not found based on your input criteria. Please try your search again with valid criteria",
        404: "Annual Amount Applied & Amount Remaining information not found based on your search criteria.  Please try your search again with valid criteria",
        500: "Service is down, Annual Amount Applied & Amount Remaining information is currently not available. Please try your search again in a few minutes. If problem persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "quicklinks": {
        500: "Benefit Search Service is temporarily down. Please try again in a few minutes. If the issue persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "findDocument": {
        400: "Documents not found. Please try your search again with valid criteria",
        404: "Documents not found. Please try your search again with valid criteria",
        500: "Benefit Search Service is temporarily down. Please try again in a few minutes. If the issue persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getDocument": {
        400: "Documents not found. Please try your search again with valid criteria",
        404: "Documents not found. Please try your search again with valid criteria",
        500: "Download is not available at this time. Please try again later."
    },
    "findEmployerGroup": {
        400: "Employer information not found based on your search criteria. Please try your search again with valid criteria",
        404: "Employer information not found based on your search criteria. Please try your search again with valid criteria",
        500: "Service is Down, Employer Information is not currently available. Please try your search again in a few minutes. If problem persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you."
    },
    "getEmployerGroup": {
        400: "Group information not found based on your search criteria.  Please try your search again with valid criteria",
        404: "Group information not found based on your search criteria.  Please try your search again with valid criteria",
        500: "Service is Down, Group Information is not currently available. Please try your search again in a few minutes. If problem persists, please open a problem ticket with the Help Desk at 888-848-3375. Thank you"
    },
    "moreResult": "Your search resulted in many results. Please narrow down your search criteria."


});
