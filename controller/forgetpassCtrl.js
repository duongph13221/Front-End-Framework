function forgetpassController($scope, $http) {
    // 
    $scope.message = "";
    $scope.isSuccess = true;
    $scope.modalShow = false;
    $scope.students = [];
    $scope.student = {
        username: "",
        email: "",
    };
    const apiStudent = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    $http.get(apiStudent).then(function(response){
        $scope.students = response.data;
        })
    
    $scope.forgetPassOnSubmit = function () {
        for (let i = 0; i < $scope.students.length; i++) {
            if (!($scope.student.username === $scope.students[i].username)) {
                $scope.message = "Tài khoản không tồn tại !";
                $scope.isSuccess = false;
                
            } else if ($scope.student.username === $scope.students[i].username && !($scope.student.email === $scope.students[i].email)) {
                $scope.message = "Email đăng ký không chính xác";
                $scope.isSuccess = false;
                return;
            } else if ($scope.student.username === $scope.students[i].username && $scope.student.email === $scope.students[i].email) {
                $scope.modalShow = true;
                $scope.message = "Mật khẩu của user: "+$scope.students[i].username +" là: "+$scope.students[i].password;
                return;
            }
        }
    }
}