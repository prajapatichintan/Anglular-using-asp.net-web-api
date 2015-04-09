$(document).ready(function () {
    $('.ngPagerContainer').addClass('pagination');

})
var app = angular.module('customersApp', ['ngGrid']);

app.controller('customerCtrl', function ($scope, $http) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10,100,500,1000],
        pageSize: 10,
        currentPage: 1
    };
    $scope.sortOptions = {
        fields: ["Name"],
        directions: ["asc"]
    };
    $scope.firstTime = false;
    $scope.setPagingData = function (data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = data;
        $scope.totalServerItems = data[0].TotalRecords;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            show();
            var data;
            if (searchText) {

                var ft = searchText.toLowerCase();
                $http.get('/api/CustomerPagging').success(function (largeLoad) {
                    data = largeLoad.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);
                });
            } else {
                $http.get('/api/CustomerPagging?page=' + page + '&pageSize=' + pageSize).success(function (largeLoad) {
                    $scope.setPagingData(largeLoad, page, pageSize);
                    hide();
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('sortOptions', function (newVal, oldVal) {
        if ($scope.firstTime) {
            var Orderbyvalue = newVal.fields[0] + ' ' + newVal.directions[0]
            $http.get('/api/CustomerPagging?page=' + $scope.pagingOptions.currentPage + '&pageSize=' + $scope.pagingOptions.pageSize + '&OrderByExpression=' + Orderbyvalue).success(function (largeLoad) {
                $scope.setPagingData(largeLoad, $scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
            });
        } else { $scope.firstTime = true; }
    }, true);
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        enableSorting: true,
        keepLastSelected: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        sortInfo: $scope.sortOptions,
        useExternalSorting: false,
    };
});