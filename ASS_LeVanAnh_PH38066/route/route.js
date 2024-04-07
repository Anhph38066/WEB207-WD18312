
angular.module('myController', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/product/list', {
        templateUrl: 'views/product/list.html' ,
        controller : ProductListController,
      
        
    })
    .when('/product/add', {
        templateUrl: 'views/product/add.html' ,
        controller : ProductAddController
    })
    .when('/product/dentail/:id', {
        templateUrl: 'views/product/detail.html' ,
        controller : ProductDentailController
    })
    .when('/product/:id/edit', {
        templateUrl: 'views/product/edit.html' ,
        controller : ProductEditController
    })
    .when('/category/list',{
        templateUrl: 'views/category/listCategory.html',
        controller: CategoryListController
    })
    .when('/category/add/',{
        templateUrl: 'views/category/add.html',
        controller: categoryAdd
    })
    .when('/category/dentaiCategory/:id',{
        templateUrl: 'views/category/dentaiCategory.html',
        controller: CategoryDetailController
    })
    .when('/category/:id/edit',{
        templateUrl: 'views/category/edit.html',
        controller: CategoryeditController
    })
});