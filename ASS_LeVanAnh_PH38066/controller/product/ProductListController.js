window.ProductListController = function ($scope, $http, $location) {
    var apiUrlProducts = "http://localhost:3000/products";
    var apiUrlCategories = "http://localhost:3000/category"; 

    $scope.getData = function () {
        $http.get(apiUrlProducts).then(function (response) {
            if (response.status == 200) {
                $scope.products = response.data;
            }
        });

        $http.get(apiUrlCategories).then(function (response) { // Lấy dữ liệu danh mục
            if (response.status == 200) {
                $scope.categories = response.data; // Gán dữ liệu danh mục vào $scope.categories
            }
        });
    };

    $scope.getData();

    $scope.getCategoryName = function(categoryId) {
        var category = $scope.categories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
    };
    
    $scope.onDelete = function (deleteID) {
        let confirm = window.confirm("Bạn có muốn xóa hay không?");

        if (confirm) {
            $http.delete(`${apiUrlProducts}/${deleteID}`).then(
                function (response) {
                    if (response.status == 200) {
                        $scope.getData();
                    }
                }
            )
        }
    };

    // Hàm chuyển đến trang chi tiết sản phẩm
    $scope.onDetail = function (id) {
        $location.path(`/product/dentail/${id}`);
    };

    // Hàm chuyển đến trang chỉnh sửa sản phẩm
    $scope.onEdit = function (id) {
        $location.path(`/product/${id}/edit`);
    };
};
