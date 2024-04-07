window.CategoryeditController = function ($scope, $http, $routeParams, $location) {
    var apiUrl = "http://localhost:3000/category";
    
    var editId = $routeParams.id;

    $scope.getCategoryInfo = function () {
        $http.get(`${apiUrl}/${editId}`).then(
            function (response) {

                if (response.status == 200) {
                    $scope.category = response.data;

                    $scope.input = {
                        name: response.data.name,
                    }
                }
            }



        ).catch(function (error) {
            $scope.message = `${error.statusText} category with id ${editId}`;
        })
    }
    $scope.getCategoryInfo();

    $scope.onSubmitFromedit = function () {
        $scope.checkValidate =
        {
            name: false,
        }
        let flag = false;
        if (!$scope.input || !$scope.input.name) {
            $scope.checkValidate.name = true;
            flag = true;
        }

        if (!flag) {
            var updateCategory = {
                ...$scope.input,
            }
            $http.put(
                `${apiUrl}/${editId}`,
                updateCategory
            ).then(function(response){
                if(response.status == 200){
                    $location.path('/category/list')
                }
            })
        }

    }
}