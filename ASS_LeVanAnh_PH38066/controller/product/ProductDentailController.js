window.ProductDentailController = function($scope, $http, $routeParams){
    var apiUrlProducts = "http://localhost:3000/products";
    var apiUrlCategories = "http://localhost:3000/category"; // Thêm đường dẫn API cho danh mục
    var id = $routeParams.id;

    $scope.getDetail = function () {
        $http.get(`${apiUrlProducts}/${id}`).then(function (response) {
            if (response.status == 200) {
                $scope.product = response.data;
                // Sau khi nhận được dữ liệu sản phẩm, ta lấy tên danh mục tương ứng
                $scope.getCategoryName($scope.product.category_id);
            }
        });
    };

    // Hàm lấy tên danh mục dựa trên id danh mục
    $scope.getCategoryName = function(categoryId) {
        $http.get(`${apiUrlCategories}/${categoryId}`).then(function (response) {
            if (response.status == 200) {
                $scope.categoryName = response.data.name;
            } else {
                $scope.categoryName = 'Unknown';
            }
        });
    };

    $scope.getDetail();
};
