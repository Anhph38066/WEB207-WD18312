window.categoryAdd = function ($scope, $http, $location) {
    var apiUrl = "http://localhost:3000/category";

    $scope.checkValidate =
    {
        name: false,
    }
    $scope.onSubmitFrom = function () {

        let flag = false;
        if (!$scope.input || !$scope.input.name) {
            $scope.checkValidate.name = true;
            flag = true;
        }

        if (!flag) {
            var newItem = {
                ...$scope.input,
            }
            $http.post(
                apiUrl,
                newItem
        ).then(function (response) {
                    if (response.status == 201) {
                        $location.path('/category/list')
                    }
                })
        }
       
    }

}