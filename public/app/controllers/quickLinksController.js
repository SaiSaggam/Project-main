angular.module('masterApp').controller('quickLinksCtrl', quickLinksCtrl);
quickLinksCtrl.$inject = ['$scope', '$rootScope', '$filter', 'serverPostReqSrv', 'TimerService', 'serverGetReqSrv', '$window'];

function quickLinksCtrl($scope, $rootScope, $filter, serverPostReqSrv, TimerService, serverGetReqSrv, $window) {

    var initialLoginTime = $filter('date')(new Date(), 'hh:mma');
    $scope.currentLogin = angular.copy(initialLoginTime);
    var init = function() {
        // check if there is query in url
        // and fire search in case its value is not empty
        getQUickLinksInformation();
        $scope.pageStart = 1;
        $scope.pageEnd = 10;
    };
    init();
    $scope.config = {
        itemsPerPage: 10,
        fillLastPage: true,
        maxPages: 5
    }
    $scope.closeModal = function() {
        $scope.$close();
    }

    $scope.pageNumber = function(pageSize) {
        var docLength = angular.copy($scope.documentDetails.document.length);
        $scope.pageStart = getPageStartNumber(pageSize);
        $scope.pageEnd = getPageEndNumber(pageSize, docLength);
    }

    function getPageEndNumber(pageNumber, totalLength) {
        var endPageNum = (pageNumber * 10) + 10;
        if (endPageNum >= totalLength) {
            endPageNum = totalLength;
        }
        return endPageNum;
    }

    function getPageStartNumber(pageNumber) {
        var startPageNum = (pageNumber * 11) - pageNumber + 1;
        return startPageNum;
    }

    function getQUickLinksInformation() {
        var selectedDocType = '';
        if (!angular.isUndefined($rootScope.documentType)) {
            selectedDocType = angular.copy($rootScope.documentType);
        }
        var finalDocList = []
        var quickLinksDocData = { "documentList": [{ "documentBaseType": "MHB", "documentBaseName": "Member Handbook MHB", "documentClass": "u_emr_docs", "document": [{ "documentID": "0902b1fc800adf1d", "documentName": "ECA1560251", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560252", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9c", "documentName": "ECA1560253", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9d", "documentName": "ECA1560254", "effectiveDate": "2014-08-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9e", "documentName": "ECA1560255", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-09-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560256", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560257", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560258", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560259", "effectiveDate": "2015-06-10T15:08:09.000Z", "expirationDate": "2016-06-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602510", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602511", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602512", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602513", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602514", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602515", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602516", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602517", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560251", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602518", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602519", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602520", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602521", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }] }, { "documentBaseType": "SBC", "documentBaseName": "Summary of Benefits & Coverage SBC", "documentClass": "u_emr_docs", "document": [{ "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560251", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560252", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9c", "documentName": "ECA1560253", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9d", "documentName": "ECA1560254", "effectiveDate": "2014-08-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9e", "documentName": "ECA1560255", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-09-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560256", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560257", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560258", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560259", "effectiveDate": "2015-06-10T15:08:09.000Z", "expirationDate": "2016-06-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602510", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602511", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602512", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602513", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602514", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602515", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602516", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602517", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560251", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602518", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602519", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602520", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602521", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }] }, { "documentBaseType": "SPD", "documentBaseName": "Summary plan Document SPD", "documentClass": "u_emr_docs", "document": [{ "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560251", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560252", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9c", "documentName": "ECA1560253", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9d", "documentName": "ECA1560254", "effectiveDate": "2014-08-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9e", "documentName": "ECA1560255", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-09-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560256", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560257", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560258", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560259", "effectiveDate": "2015-06-10T15:08:09.000Z", "expirationDate": "2016-06-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602510", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602511", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602512", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602513", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602514", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602515", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602516", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602517", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560251", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602518", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602519", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602520", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602521", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }] }, { "documentBaseType": "SOB", "documentBaseName": "Summary of Benefits SOB", "documentClass": "u_emr_docs", "document": [{ "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560251", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560252", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9c", "documentName": "ECA1560253", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9d", "documentName": "ECA1560254", "effectiveDate": "2014-08-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9e", "documentName": "ECA1560255", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-09-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560256", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560257", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560258", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA1560259", "effectiveDate": "2015-06-10T15:08:09.000Z", "expirationDate": "2016-06-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602510", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602511", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602512", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602513", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602514", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602515", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602516", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602517", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA1560251", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602518", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602519", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }, { "documentID": "0902b1fc8008aa9a", "documentName": "ECA15602520", "effectiveDate": "2015-07-10T15:08:09.000Z", "expirationDate": "2015-07-10T15:08:09.000Z", "contentStreamMimeType": "PDF" }, { "documentID": "0902b1fc8008aa9b", "documentName": "ECA15602521", "effectiveDate": "2014-07-10T15:08:09.000Z", "expirationDate": "", "contentStreamMimeType": "Word" }] }] };
        angular.forEach(quickLinksDocData.documentList, function(document) {
            if (document.documentBaseType === selectedDocType) {
                angular.forEach(document.document, function(docData) {
                    if (!(angular.isUndefined(docData.effectiveDate) || docData.effectiveDate == ''))
                        docData.effectiveDate = $filter('date')(new Date(docData.effectiveDate), 'MMM-dd-yyyy');
                    if (!(angular.isUndefined(docData.expirationDate) || docData.expirationDate == ''))
                        docData.expirationDate = $filter('date')(new Date(docData.expirationDate), 'MMM-dd-yyyy');
                });

                finalDocList.push(document);

            }
        });
        $scope.documentDetails = finalDocList[0];
    }
    $scope.docSubmit = function(doc) {
        var getDocServName = "getDocument";
        var documentContract = {
            "documentID": ""
        };
        documentContract = angular.extend(documentContract, doc);
        var endPoint = getDocServName + '?id=' + documentContract.documentID;
        serverGetReqSrv.send("getDocument").then(function(d) {
            console.log(d.data);
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.click();
            console.log('link clicked');
            // $window.open('/getDocument', '_blank');
            // $scope.closeModal();
        }).catch(function(err) {
            console.log(err);
        });
    }

    function getQuickLinksData() {
        var QuickLinksReqName = "quicklinks/getQuickLinks";
        TimerService.init();
        serverGetReqSrv.send(QuickLinksReqName).then(function(d) {
            TimerService.log('Get Quick Links Response got in');
            $scope.form = d.data;
            $scope.resQuickLinks = d.data.Links;
            $scope.restObj = angular.copy($scope.form);

        }).catch(function(err) {
            // Need to handle exceptions
        });
    };

    function UpdateQuickLinksData(restObj) {
        var QuickLinksUpdateReqName = "quicklinks/postQuickLinks";
        var reqObj = angular.copy(restObj);
        TimerService.init();
        serverPostReqSrv.send(QuickLinksUpdateReqName, reqObj).async().then(function(d) {
            TimerService.log('Language Response got in');
            // logic to check for errors
            console.log('updated links ' + JSON.stringify(d.data));

        }); // end serverPostReq
    };

    $scope.addFields = function(form) {
        if (typeof form.links == 'undefined') {
            form.links = [];
        }
        form.links.push({
            title: '',
            url: '',
            id: true
        });
    };

    $scope.deleteRow = function(i) {
        $scope.form.links.splice(i, 1);
    };

    $scope.submit = function(form) {
        for (var j = 0; j < $scope.form.links.length; j++) {
            $scope.form.links[j].id = false;
            if ($scope.form.links[j].title == "" && $scope.form.links[j].url == "") {
                scope.form.links.splice(j, 1);
                j--;
            }

        }
        $scope.restObj = angular.copy($scope.form);
        $scope.resQuickLinks = $scope.restObj;
        UpdateQuickLinksData($scope.restObj);
    };

    $scope.Cancel = function() {
        $scope.form = angular.copy($scope.restObj);
    };

};
