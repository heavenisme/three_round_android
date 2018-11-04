var app = angular.module('starter.MyDirective',[])

.directive('orientable', function ($ionicLoading) {   

    return {
        link: function(scope, element, attrs) {   

            element.bind("load" , function(e){ 

                // success, "onload" catched
                // now we can do specific stuff:
                $ionicLoading.hide();
                //alert("load...");
            });

            element.bing("onerror", function(e){ 
                $ionicLoading.hide();
            });

            element.bing("error", function(e){ 
                $ionicLoading.hide();
            });

            attrs.$observe("src" , function(e){ 
                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner>',
                    noBackdrop: false,
                    scope:scope
                });

            });

        }
    }
});