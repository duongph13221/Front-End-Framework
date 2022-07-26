function questionsController($scope, $rootScope, $http, $routeParams) {
    $rootScope.id = 0;
    $rootScope.questionNum = 1;
    $rootScope.answerMod = false;
    $rootScope.lstQuestions = [];
    $rootScope.quizName = $routeParams.name;
    const apiQuestions = 'https://620e69a0585fbc3359e1b16d.mockapi.io/' + $routeParams.id;
    $http.get(apiQuestions).then(function (response) {
        $rootScope.lstQuestions = response.data;
    })
    $rootScope.getQuestion = function () {
        $scope.options = [];

        if ($rootScope.lstQuestions.length > 0 && $rootScope.id < $rootScope.lstQuestions.length) {
            $scope.question = $rootScope.lstQuestions[$rootScope.id].Text;
            $scope.options = $rootScope.lstQuestions[$rootScope.id].Answers;
            $scope.answer = $rootScope.lstQuestions[$rootScope.id].AnswerId;
        } else {
        }
    }
    $scope.start = function () {
        $scope.getQuestion();
    }
    
    $scope.nextQuestion = function () {
        if ($rootScope.id < $rootScope.lstQuestions.length) {
            $rootScope.id++;
            $rootScope.questionNum++;
        }
        $rootScope.getQuestion();

    }
    $scope.preQuestion = function () {
        if ($rootScope.id > 0) {
            $rootScope.id--;
            $rootScope.questionNum--;
        }
        $rootScope.getQuestion();
    }
}