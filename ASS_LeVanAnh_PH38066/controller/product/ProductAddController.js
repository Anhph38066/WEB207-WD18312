window.ProductAddController = function ($scope, $http, $location) {
    var apiUrl = "http://localhost:3000/products";
    var apiUrlCategory = "http://localhost:3000/category";

    $scope.getDataCategory = function () {
        $http.get(apiUrlCategory).then(function (response) {
            if (response.status == 200) {
                $scope.category = response.data;
            };
        });
    };

    $scope.getDataCategory();

    // Kiểm tra dữ liệu có hợp lệ không
    $scope.checkData =
    {
        name: false,
        price: false,
        description: false,
    }

    $scope.onSubmitFrom = function () {
        let flag = false;
    
        if (!$scope.inputValidate || !$scope.inputValidate.name) {
            $scope.checkData.name = true;
            flag = true;
        }
    
        if (!$scope.inputValidate || !$scope.inputValidate.price) {
            $scope.checkData.price = true;
            flag = true;
        }
    
        if (!$scope.inputValidate || !$scope.inputValidate.description) {
            $scope.checkData.description = true;
            flag = true;
        }
    
        if ($scope.inputValidate && $scope.inputValidate.price < 0) {
            $scope.checkData.soam = true;
            flag = true;
        }
    
        // Kiểm tra ký tự đặc biệt trong tên sản phẩm
        if ($scope.inputValidate && !/^[a-zA-Z0-9\s]+$/.test($scope.inputValidate.name)) {
            $scope.checkData.kytudacbiet = true;
            flag = true;
        }
    
        if (!flag) {
            var newItem = {
                ...$scope.inputValidate,
            }
    
            $http.post(
                apiUrl,
                newItem
            ).then(function(response){
                if(response.status == 201){
                    $location.path('/product/list');
                }
            });
        }
    }

}
