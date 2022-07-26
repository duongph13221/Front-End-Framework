function examController ($scope, $rootScope, $http, $routeParams) {
    $scope.isProgress = false;
    $rootScope.id = 0;
    $rootScope.questionNum = 1;
    $rootScope.score = 0;
    var userAns = 0;
    $rootScope.answerMod = false;
    $rootScope.quizOver = false;
    $rootScope.lstQuestions = [];
    $rootScope.quizName = $routeParams.name;
    $rootScope.currentStudent = JSON.parse(localStorage.getItem("current-student"));
    const apiQuestions = 'https://620e69a0585fbc3359e1b16d.mockapi.io/'+$routeParams.id;
    const api = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    $http.get(apiQuestions).then(function(response){
    $rootScope.lstQuestions = response.data;
    })
    $scope.start = function(){
        $scope.isProgress = true;
        $rootScope.quizOver = false;
        $rootScope.id = Math.floor(Math.random() * ($rootScope.lstQuestions.length - 10));
        $rootScope.limit = $rootScope.id + 10 ;
        $scope.getQuestion();
    }
    $scope.reset = function(){
        $scope.isProgress = false;
        $rootScope.score = 0;
        $rootScope.questionNum = 1;
    }
    $rootScope.getQuestion = function(){
        $scope.options = [];
        
        if($rootScope.lstQuestions.length > 0 && $rootScope.id < $rootScope.limit){
            $scope.question = $rootScope.lstQuestions[$rootScope.id].Text;
            $scope.options = $rootScope.lstQuestions[$rootScope.id].Answers;
            $scope.answer = $rootScope.lstQuestions[$rootScope.id].AnswerId;
            $rootScope.answerMod = true;
            $scope.userAns = userAns;
        }else{
            $rootScope.quizOver = true;
        }
        
    }
    $scope.checkAnswer = function(){
        if(!$('input[name = answer]:checked').length) return;
        var ans = $('input[name = answer]:checked').val();
        userAns = ans;
        if(ans == $scope.answer){
            // alert("Đúng");
            $rootScope.score++;
            $scope.correctAns = true;
        } else {
            // alert("Sai");
            $scope.correctAns = false;
        }
        $rootScope.answerMod = false;
    };
    $scope.nextQuestion = function(){
        if ($rootScope.id < $rootScope.limit) {
            $rootScope.id++;
            $rootScope.questionNum++;
        }
        $rootScope.getQuestion();
    }
    $scope.finishTest = function (){
        $rootScope.quizOver = true;
        $scope.histories = [];
        $scope.history = {
            subjectId: "",
            subjectName: "",
            score: ""
        };
        const getAPI = api + '/' + $rootScope.currentStudent.id;
        $http.get(getAPI)
        .then(function (response) {
            console.log(response.data);
            $scope.histories = response.data.history;
            $scope.history.subjectId = $routeParams.id;
            $scope.history.subjectName = $routeParams.name;
            $scope.history.score = $rootScope.score;
            $scope.histories.push($scope.history);
            $rootScope.currentStudent.history = $scope.histories;
            $http.put(getAPI, $rootScope.currentStudent)
            .then(function (response) {
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}