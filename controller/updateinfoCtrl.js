function updateinfoController($scope, $http, $rootScope) {
    $scope.message = "";
    $scope.isSuccess = true;
    $scope.student = {
        id: "",
        username: "",
        password: "",
        fullname: "",
        email: "",
        gender: "",
        birthday: "",
        schoolfee: "",
        marks: ""
    };
    $rootScope.currentStudent = JSON.parse(localStorage.getItem("current-student"));
    $scope.student = $rootScope.currentStudent;
    $scope.student.id = parseInt($rootScope.currentStudent.id);
    const api = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';

    $scope.updateAccount = function () {
        $scope.onUpdate = function (id) {
            const updateAPI = api + '/' + id;
            console.log($scope.student);
            $http.put(updateAPI, $scope.student)
                .then(function (response) {

                    $scope.message = "Cập nhật thành công";
                    $scope.isSuccess = true;
                    document.documentElement.scrollTop = 0;

                })
                
        }
    }
}