var app = angular.module("myQuiz", []);
        app.directive("quizfpoly",function(){
            return {
                restrict : 'AE',
                scope:{},
                templateUrl:"template.html",
                link: function (scope, element, attr){
                    scope.start = function(){
                        scope.inProgress = true;
                    };
                    scope.reset = function(){
                        scope.inProgress = false;
                    };
                    scope.reset();
                }
            }
        });