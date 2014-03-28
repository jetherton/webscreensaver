
var makeGuid = function () {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}

//Local Storage key
var WEB_PAGES_KEY = "webPages";

/**
 * Angular controller
 */
function MenuCtrl($scope) {

    
    $scope.menuVisible = true;
    
    
    $scope.init = function(){
        if(typeof(Storage)!=="undefined"){
            //initialize webPages from local storage
            $scope.webPages = angular.fromJson(localStorage.getItem(WEB_PAGES_KEY));
            //the very first time this will be null
            if($scope.webPages == null){
                $scope.webPages = [];
            }
        }
        else{
            alert("I'm sorry, but you're browser is old, and doesn't support local storage");
            $scope.menuVisible = false;
        }
    }
    
    /**
    * Add a new web page
    */
    $scope.addWebPage = function() {
        $scope.webPages.push({url:$scope.webPageUrl, id:makeGuid()});
        $scope.webPageUrl = '';
        localStorage.setItem(WEB_PAGES_KEY, angular.toJson($scope.webPages));
    };
 

    /**
     * Delete a specified web page
     */
    $scope.deleteWebpage = function(id) {
        var oldWebPages = $scope.webPages;
        $scope.webPages = [];
        angular.forEach(oldWebPages, function(webPage) {
            if (webPage.id !== id) $scope.webPages.push(webPage);
        });
        localStorage.setItem(WEB_PAGES_KEY, angular.toJson($scope.webPages));
    };
}


