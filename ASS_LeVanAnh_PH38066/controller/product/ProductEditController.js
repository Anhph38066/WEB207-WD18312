window.ProductEditController = function ($scope, $http, $routeParams, $location) {
    var apiUrl = "http://localhost:3000/products";
    var editId = $routeParams.id;
    var apiUrlCategory = "http://localhost:3000/category";


    $scope.getProductInfo = function () {
        $http.get(`${apiUrl}/${editId}`).then(
            function (response) {
                if (response.status == 200) {
                    $scope.product = response.data;

                    $scope.inputValidate = {
                        name: response.data.name,
                        price: response.data.price,
                        description: response.data.description,
                        category_id: response.data.category_id 
                    };
                    // Gọi hàm để lấy tên danh mục dựa trên category_id
                    $scope.getCategoryName($scope.product.category_id);
                }
            }
        ).catch(function (error) {
            $scope.message = `${error.statusText} product with id ${editId}`;
        });
    };

    $scope.getCategoryName = function(categoryId) {
        $http.get(`${apiUrlCategory}/${categoryId}`).then(function (response) {
            if (response.status == 200) {
                $scope.categoryName = response.data.name;
            } else {
                $scope.categoryName = 'Unknown';
            }
        });
    };

    $scope.getCategories = function() {
        $http.get(apiUrlCategory).then(function(response) {
            if (response.status == 200) {
                $scope.category = response.data;
            }
        }).catch(function(error) {
            console.error("Error fetching categories:", error);
        });
    };

    $scope.getProductInfo();
    $scope.getCategories();

    $scope.checkData = {
        name: false,
        price: false,
    };

    $scope.onEditForm = function () {
        // Kiểm tra dữ liệu nhập vào
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

        if (!flag) {
            // Tạo đối tượng updateProduct để gửi đi cập nhật
            var updateProduct = {
                ...$scope.inputValidate,
            };
            // Gửi yêu cầu PUT để cập nhật thông tin sản phẩm
            $http.put(
                `${apiUrl}/${editId}`,
                updateProduct
            ).then(function (response) {
                if (response.status == 200) {
                    $location.path('/product/list');
                }
            });
        }
    };
};
