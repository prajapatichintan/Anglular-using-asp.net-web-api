//following is our application module.ngGrid is the angular grid that we need to use to display data.
var customersApp = angular.module('customersApp', ['ngGrid']);
var url = '/api/Customer';
//the factory object for the webAPI call.
customersApp.factory('customerRepository', function ($http) {
    
    return {

        getCustomers: function (callback) {
            $http.get(url).success(callback);
        }
        ,
        //method for insert
        insertUser: function (callback, user) {
            //var user = { "Id": user.id, "City": user.city, "Name": user.name, "Address": user.address, "State": user.state, "Country": user.country };
            $http.post(url, user).success(callback);

        },
        //method for update
        updateUser: function (callback, user) {
            $http.put(url + '/' + user.id, user).success(callback);

        }
        ,
        //method for delete
        deleteUser: function (callback, id) {
            $http.delete(url + '/' + id).success(callback);

        }

    }
});

//controller   
customersApp.controller('customerCtrl', function ($scope, customerRepository) {
   
    getCustomers();
    function getCustomers() {
       
        customerRepository.getCustomers(function (results) {
            hide();
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
        ngGroupPanelDescription: 'Asp.net MVC CRUD Example using AngularJS',
        columnDefs: [{ field: 'Name', displayName: 'name', width: '15%' },
            { field: 'City', displayName: 'city', width: '15%' },
            { field: 'Address', displayName: 'address', width: '15%' },
            { field: 'State', displayName: 'state', width: '15%' },
            { field: 'Country', displayName: 'country', width: '15%' },
            { displayName: 'Options', cellTemplate: '<input type="button" ng-click="setScope(row.entity,\'edit\')" name="edit"  value="Edit">&nbsp;<input type="button" ng-click="DeleteUser(row.entity.Id)"  name="delete"  value="Delete">', width: '25%' }
        ]
    };


    $scope.update = function () {
        show();
        if ($scope.action == 'edit') {
            customerRepository.updateUser(function (e) {
                $scope.status = 'customer updated successfully';
                getCustomers();
            }, $scope.New)
            $scope.action = '';
        }
        else {
            customerRepository.insertUser(function (e) {
                getCustomers();
            }, $scope.New)

        }
        $scope.New = null;

    }
    $scope.DeleteUser = function (id) {
        show();
        customerRepository.deleteUser(function (e) {
            getCustomers();
        }, id)

    }

});


