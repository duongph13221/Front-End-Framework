function signinController($scope, $http) {
    $scope.students = [];
    $scope.message = "";
    $scope.confirmPass = "";
    $scope.isSuccess = true;
    $scope.student = {
        id: "",
        username: "",
        password: "",
        fullname: "",
        email: "",
        gender: "",
        role: false,
        birthday: "",
        history: [],
        schoolfee: "",
        marks: ""
    };
    const apiStudent = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    $http.get(apiStudent).then(function (response) {
        $scope.students = response.data;
    })

    $scope.onSubmitForm = function () {
        $scope.student.id = $scope.students.length;
        if (!($scope.confirmPass == $scope.student.password)) {
            $scope.message = "Mật khẩu không khớp";
            $scope.isSuccess = false;
            document.documentElement.scrollTop = 0;
            return;
        } else {
            $http.post(apiStudent, $scope.student)
                .then(function (response) {
                    $scope.message = "Đăng ký thành công";
                    $scope.isSuccess = true;
                    $scope.students.push(response.data);
                    document.documentElement.scrollTop = 0;
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.message = "Đăng ký thất bại";
                    $scope.isSuccess = false;
                    document.documentElement.scrollTop = 0;
                })
            console.log("on form submit", $scope.student);
        }
    }
}
