
//following is our application module.ngGrid is the angular grid that we need to use to display data.
var customersApp = angular.module('CustomerTask', ['ngGrid']);
var url = '/api/Task';
var CustomerURL = '/api/Customer';
//the factory object for the webAPI call.
customersApp.factory('customerRepository', function ($http) {
    return {
        getCustomers: function (callback) {
            
            $http.get(url).success(callback);
        },
        gettaskID: function (callback, id) {

            $http.get(url + '/' + id).success(callback);
        },
        insertUser: function (callback, user) {
            $http.post(url, user).success(callback);
        },
        //method for update
        updateUser: function (callback, user) {
            $http.put(url + '/' + user.id, user).success(callback);
        },
        allModels: function (callback) {
            return $http.get(CustomerURL).success(callback);
        },
        UpdateStatus: function (callback, id, status) {
            $http.get('/home/UpdateTask?id=' + id + '&Status=' + status).success(callback);
        }
    }
});

//controller   
customersApp.controller('customerTaskCtrl', function ($scope, customerRepository) {
    getCustomers();
    BindDropDown();
    function getCustomers() {
        customerRepository.getCustomers(function (results) {
            $scope.customerData = results;
        })
    }
    function BindDropDown() {
        customerRepository.allModels(function (results) {
            $scope.allModels = results;
        })
    }

    function SetStatus(statusvalue) {
        var text = $scope.TaskStatuss[statusvalue];
        return ' status is ' + text.value;
    }
    $scope.setScope = function (obj, action) {
        $scope.action = action;
        $scope.New = obj;
        var d = new Date(obj.TaskDate);
        var dd = (d.getMonth() + 1);
        if (d.getMonth() < 10) {
            dd = '0' + dd;
        }
        var day = d.getDate();
        if (d.getDate() < 10) {
            day = '0' + day;
        }
        var newdate = d.getFullYear() + '-' + dd + '-' + day;
        $scope.New.TaskDate = newdate;
        BindDropDown();
    }
    $scope.gridOptions = {
        data: 'customerData',
        showGroupPanel: true,
        ngGroupPanelDescription: 'Asp.net MVC CRUD Example using AngularJS',
        columnDefs: [{
            field: 'TaskStatus',
            displayName: '',
            cellTemplate: '<input type="checkbox" ng-model="row.entity.TaskStatus" ng-checked="row.entity.TaskStatus>0" ng-click="UpdateStatus(row.entity.Id,row.entity.TaskStatus)">', width: '10%'
        },
            { field: 'TaskName', displayName: 'TaskName', width: '20%' },
            { field: 'CustomerName', displayName: 'CustomerName', width: '20%' },
            { field: 'TaskDate', displayName: 'TaskDate', width: '20%' ,cellFilter: "date:'yyyy-MM-dd'"},
            { field: 'TaskStatus', cellFilter: 'mapStatus', width: '10%' },
            { displayName: 'Options', cellTemplate: '<input type="button" ng-click="setScope(row.entity,\'edit\')" name="edit"  value="Edit">', width: '25%' }
        ]
    };

    $scope.update = function () {
        show();
        if ($scope.action == 'edit') {
            customerRepository.updateUser(function (e) {
                $scope.status = 'customer updated successfully';
                getCustomers();
                hide();
                $scope.New = null;
            }, $scope.New)
            $scope.action = '';
           
        }
        else {
            customerRepository.insertUser(function (e) {
                getCustomers();
                hide();
            }, $scope.New)
           

        }
    };
    $scope.UpdateStatus = function (id, status) {
        show();
        customerRepository.UpdateStatus(function (e) {
            $scope.status = 'customer task status updated successfully';
            if (e == "Done") {
                hide();
            } else {
                getCustomers();
            }
        }, id, status)
        //do something usefull here, you have the name and the new value of dude. Write it to a db or else. 
        
    }
    $scope.gettaskID = function (id) {
        customerRepository.gettaskID(function (e) {

        }, id)

    }
    $scope.TaskStatuss = [
      { TaskStatus: 0, value: 'Pending' },
      { TaskStatus: 1, value: 'Completed' },
    ]
}).filter('mapStatus', function () {
    return function (code) {
        if (code == 0) {
            return 'Pending';
        } else {
            return 'Completed';
        }
    };
});;


