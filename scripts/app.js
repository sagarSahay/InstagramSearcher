/**
 * Created by Sagar on 25/03/2015.
 */
angular.module('InstagramApp', [])
    .controller('InstagramController', function (InstagramService, $sce, $scope,$window) {
        var vm = this;
        vm.keyword = '';
        vm.display = false;
        vm.count = 0;
        vm.data = null;

        vm.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };
        vm.submit = function () {
            InstagramService.get(vm.keyword).then(function (result) {
                vm.data = result.data.data;
                vm.count = result.data.data.length;
                vm.display = true;
            }).catch(function (error) {
                console.log(error);
            })

        };
        $scope.$watch('vm.keyword', function (str) {
            if (str === '') {
                vm.display = false;
            }
        });
        $scope.openLinkWindow = function (link) {
            $window.open(link);
        };
    }).service('InstagramService', function ($http) {
        var result = null;
        return {
            'get': function (keyword) {

                var clientId = '3e147fa6d878423d904ab741726c67a1';
                var url = 'https://api.instagram.com/v1/tags/' + keyword + '/media/recent';
                var request = {
                    callback: "JSON_CALLBACK",
                    client_id: clientId
                };


                return $http({
                    method: 'JSONP',
                    url: url,
                    params: request
                }).success(function (response) {
                    result = response;
                }).error(function (error) {
                    result = error;
                });
            }
        }

    });