function usermanageController($scope, $http, $rootScope) {
    // Khởi tạo
    $scope.students = [];
    $scope.message = "";
    $scope.isSuccess = true;
    $scope.student = {
        id: "",
        username: "",
        password: "",
        fullname: "",
        email: "",
        gender: "",
        role: "",
        birthday: "",
        history: [],
        schoolfee: "",
        marks: ""
    };
    $rootScope.index = 0;
    $scope.isLoading = false;
    const api = 'https://620e69a0585fbc3359e1b16d.mockapi.io/Students';
    $http.get(api) // Gửi request dạng GET lên API
        .then(function (response) {
            $scope.students = response.data; // gán dữ liệu lấy được ở api vào mảng students
            $scope.isLoading = false;
            // for (let i = 0; i < $scope.students.length; i++) {
            //     $scope.students[i].id = i;
            // }
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    $scope.onSubmitForm = function (event) {
        event.preventDefault(); // phải ở đầu
        if ($rootScope.index == 0) {
            $scope.student.id = $scope.students.length;
            $http.post(api, $scope.student) //gửi request dạng POST kèm data lên api
                .then(function (response) {
                    //tắt loading
                    $scope.isLoading = false;
                    //thông báo
                    $scope.message = "Thêm mới thành công";
                    $scope.isSuccess = true;
                    document.documentElement.scrollTop = 0;
                    //thêm dữ liệu mới thêm vào mảng
                    $scope.students.push(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    $scope.isLoading = false;
                    $scope.message = "Thêm mới thất bại";
                    $scope.isSuccess = false;
                })
        } else {
            $scope.onUpdate($scope.student.id);
        }
    }

    $scope.onDelete = function (id) {
        // lấy vị trí nối vào link api
        const deleteAPI = api + '/' + id;
        $scope.isLoading = true;
        // gửi request dạng DELETE lên api
        $http.delete(deleteAPI)
            .then(function (response) {
                $scope.isLoading = false;
                $scope.message = "Xóa thành công";
                $scope.isSuccess = true;
                document.documentElement.scrollTop = 0;
                //splice xóa trong mảng
                const index = $scope.students.indexOf(response.data);
                $scope.students.splice(index, 1);
                $http.get(api)
                    .then(function (response) {
                        $scope.students = response.data; 
                    })
                $("#modal_delete_" + id).modal('hide');
            })
            .catch(function (error) {
                $scope.isLoading = false;
                $scope.message = "Xóa thất bại";
                $scope.isSuccess = false;
                document.documentElement.scrollTop = 0;
                $("#modal_delete_" + id).modal('hide');
            })
    }
    $scope.onClick = function (id) {
        const getAPI = api + '/' + id;
        $scope.isLoading = true;
        $http.get(getAPI)
            .then(function (response) {
                $scope.student = response.data;
                $rootScope.index = -1;
            })
            .catch(function (error) {
                $scope.isLoading = false;
            })
    }
    $scope.onUpdate = function (id) {
        const updateAPI = api + '/' + id;
        $scope.isLoading = true;
        $http.put(updateAPI, $scope.student)
            .then(function (response) {
                $scope.isLoading = false;
                $scope.message = "Cập nhật thành công";
                $scope.isSuccess = true;
                document.documentElement.scrollTop = 0;
                $rootScope.index = 0;
                $http.get(api)
                    .then(function (response) {
                        $scope.students = response.data; 
                    })
            })
            .catch(function (error) {
                $scope.isLoading = false;
                $scope.message = "Cập nhật thất bại";
                $scope.isSuccess = false;
                document.documentElement.scrollTop = 0;
                $rootScope.index = 0;
            })
    }
}