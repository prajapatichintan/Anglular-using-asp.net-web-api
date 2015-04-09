
//following is our application module.ngGrid is the angular grid that we need to use to display data.
var customersApp = angular.module('customersApp', ['ngGrid']);
var url = '/api/CustomerPagging';

//the factory object for the webAPI call.
customersApp.factory('customerRepository', function ($http) {
    return {
        getCustomers: function (callback) {
            $http.get(url).success(callback);
        }
    }
});

//controller   
customersApp.controller('customerCtrl', function ($scope, customerRepository) {
    getCustomers();
    function getCustomers() {
        customerRepository.getCustomers(function (results) {
            $scope.customerData = results;
        })
    }
    $scope.setScope = function (obj, action) {

        $scope.action = action;
        $scope.New = obj;
    }
    $scope.gridOptions = {
        data: 'customerData',
        showGroupPanel: true,
        enablePaging: true,
        pagingOptions: $scope.pagingOptions,
        ngGroupPanelDescription: 'Asp.net MVC CRUD Example using AngularJS',
        columnDefs: [{ field: 'Name', displayName: 'name', width: '20%' },
            { field: 'City', displayName: 'city', width: '20%' },
            { field: 'Address', displayName: 'address', width: '20%' },
            { field: 'State', displayName: 'state', width: '20%' },
            { field: 'Country', displayName: 'country', width: '20%' }
        ]
    };

});


