function historyController($scope, $http, $rootScope){
    $rootScope.currentStudent = JSON.parse(localStorage.getItem("current-student"));
    $scope.histories = [];
    const api = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    const getAPI = api + '/' + $rootScope.currentStudent.id;
    $http.get(getAPI)
        .then(function (response) {
            $scope.histories = response.data.history;
        })
        .catch(function (error) {
            console.log(error);
        });
}