
/*

Desc: Server Post Request which sends client reques to server/backend for oil response and mapping
Params: jsonReq:  the request in json format which should be send. 
Status: deprecated
Notes: 

*/
/*.service('findIndvService3', function ($http,$location,$browser) {

this.findInd = function (JsonRequest) {

// do no touch this code. this is required for project to work both locally and on OSE, TODO: make this GLOBAL
//   var baseUrl;
//   if($location.host() == "localhost") {
//     baseUrl= "http://localhost:8080";

//   }
//   else (baseUrl=$location.host());
// console.log("baseUrl used is: " + baseUrl );
  var config = {
      headers : {
          'Content-Type': 'application/json'
      }
  }

return {
    async: function () {
        return $http.post( '/testFindIndPost', JsonRequest, config)
            .success(function (data, status, headers, config) {
                // console.log("POST Method Success, status: " + status + " header: " +
                //  headers + " config: " + config  + " Data: " + data );
            })
            .error(function (data, status, header, config) {
                // console.log("POST Method Failed, status: " + status + " header: " +
                //  header + " config: " + config  + " Data: " + data );
            });
    }
};
    };
})*/



// GET METHOD CODE EXAMPLE. STATUS: DEPRECATED AS OF NOW
/*.service('findIndvService2', function ($http,$location,$browser) {

this.findInd = function (stateCode,lastName) {
  
// do no touch this code. this is required for project to work both locally and on OSE, TODO: make this GLOBAL
  var baseUrl;
  if($location.host() == "localhost") {
    baseUrl= "http://localhost:8080";

  }
  else (baseUrl=$location.host());
console.log("baseUrl used is: " + baseUrl );


return {

    async: function () {
        return $http({
            url: baseUrl+"/testFindInd3?lastname=" + lastName +"&statecode=" + stateCode,
            method: "GET",          
        }).success(function(data) {                
          
             // console.log(JSON.stringify(data));  
               return JSON.stringify(data);      
        }).error(function(err) {                
            //console.log(err);
        });
    }

};
};

})*/



