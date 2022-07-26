function loginController($scope, $http, $location, $rootScope){
    $scope.students = [];
    $scope.message = "";
    $scope.isSuccess = true;
    $scope.student = {
        username: "",
        password: "",
    };
    $rootScope.isLoading = true;
    const apiStudent = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    $http.get(apiStudent).then(function(response){
    $scope.students = response.data;
    })
    $scope.logIn = function (){
        for (let i = 0; i < $scope.students.length; i++) {
            if (!($scope.student.username === $scope.students[i].username)) {
                $scope.message = "Tài khoản không tồn tại !";
                $scope.isSuccess = false;
                
            } else if ($scope.student.username === $scope.students[i].username && !($scope.student.password === $scope.students[i].password)) {
                $scope.message = "Sai mật khẩu !";
                $scope.isSuccess = false;
                return;
            } else if ($scope.student.username === $scope.students[i].username && $scope.student.password === $scope.students[i].password) {
                $scope.message = "Đăng nhập thành công !";
                $scope.isSuccess = true;
                $rootScope.isLogin = true;
                $location.path('/');
                localStorage.setItem("current-student", JSON.stringify($scope.students[i]))
                $rootScope.currentStudent = JSON.parse(localStorage.getItem("current-student"))
                if ($rootScope.currentStudent.role == "true") {
                    $rootScope.isAdmin = true;
                } else {
                    $rootScope.isAdmin = false;
                }
                return;
            }
            
        }
    }
}
