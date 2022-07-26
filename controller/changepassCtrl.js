function changepassController($scope, $http, $rootScope) {
    //
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.students = [];
    $scope.message = "";
    $scope.confirmPassword = "";
    $scope.oldPass = "";
    $scope.newPass = "";
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
    $scope.student = $rootScope.currentStudent;
    $scope.student.id = parseInt($rootScope.currentStudent.id);
    console.log($scope.student);
    const api = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    $http.get(api).then(function (response) {
        $scope.students = response.data;
    })

    $scope.onSubmitForm = function (id) {
        $scope.student.id = $scope.students.length;
        if (!($scope.oldPass == $scope.student.password)) {
            $scope.message = "Mật khẩu cũ không khớp";
            $scope.isSuccess = false;
            document.documentElement.scrollTop = 0;
            return;
        } else if ($scope.oldPass == $scope.newPass) {
            $scope.message = "Mật khẩu mới không được giống mật khẩu cũ";
            $scope.isSuccess = false;
            document.documentElement.scrollTop = 0;
            return;
        }else if (!($scope.newPass == $scope.confirmPassword)) {
            $scope.message = "Xác nhận mật khẩu mới không khớp";
            $scope.isSuccess = false;
            document.documentElement.scrollTop = 0;
            return;
        } else {
            $scope.student.password = $scope.newPass;
            const updateAPI = api + '/' + id;
            $http.put(updateAPI, $scope.student)
                .then(function (response) {
                    $scope.message = "Đổi mật khẩu thành công";
                    $scope.isSuccess = true;
                    document.documentElement.scrollTop = 0;
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.message = "Đổi mật khẩu thất bại";
                    $scope.isSuccess = false;
                    document.documentElement.scrollTop = 0;
                })
        }
    } 
}