function subjectController($scope, $http) {
    $scope.lstSubject = [];
    const apiSubject = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Subjects';
    $http.get(apiSubject).then(function(response){
      $scope.lstSubject = response.data;
    })
}