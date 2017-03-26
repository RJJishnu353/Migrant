(function () {
    'use strict';

    angular
            .module('app')
            .controller('MainCtrl', MainCtrl);

    //MainCtrl.$inject = ['$scope', 'MainFactory'];

    function MainCtrl($scope, MainFactory) {

        $scope.details = [];

        $scope.detailsModel = {
            "adformat_id": 1,
            "name": "Format 1",
            "size": "300x250"
        };

        $scope.add = function () {
            $scope.details.push($scope.detailsModel);
        };

        $scope.delete = function (index) {
            $scope.details.splice(index, 1);
        };

        $scope.edited = -1;
        $scope.editedModel = {
            "adformat_id": 0,
            "name": "",
            "size": ""
        };

        $scope.edit = function (index) {
            $scope.edited = index;
        };

        $scope.finishEdit = function (index) {
            $scope.details[index] = $scope.editedModel;
            $scope.edited = -1;
        };
    }
})();
