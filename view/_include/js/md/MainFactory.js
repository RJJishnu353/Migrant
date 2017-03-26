(function () {
    'use strict';

    angular
            .module('app')
            .factory('MainFactory', MainFactory);

    MainFactory.$inject = [];

    function MainFactory() {

        var self = this;

        self.details = [];
        self.get = $http.get('data/home.json')
                .then(function (response) {
                    self.details = response.data;
                }).catch(function (error) {
                    // log error
                });

        return self;
    }
})();
