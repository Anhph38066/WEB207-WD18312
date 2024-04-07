window.CategoryListController = function ($scope, $http, $location) {
    var apiUrl = "http://localhost:3000/category";
    $scope.getDataCategory = function () {
        $http.get(apiUrl).then(function (response) {
            if (response.status == 200) {
                $scope.category = response.data
            };
        });
    };

    $scope.getDataCategory();
 
    $scope.onDeleteCategory =function(deleteID){
        let confirm = window.confirm("Bạn có muốn xóa hay không?");
        if (confirm) {
            $http.delete(`${apiUrl}/${deleteID}`).then(
                function (response) {
                    if (response.status == 200) {
                        $scope.getDataCategory();
                    }
                }
            )
        }
    }

$scope.onDetailCategory = function(id){
    $location.path(`/category/dentaiCategory/${id}`);
}


$scope.onEditCategory = function(id){
    $location.path(`/category/${id}/edit`);
}
};