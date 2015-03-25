/**
 * Created by Sagar on 25/03/2015.
 */
angular.module('InstagramApp',[])
    .controller('InstagramController',function($scope,$http,$q){
              $scope.keyword='';

        $scope.submit=function(){
            var clientId='2a4fac4d6fbb48b890085ad5f873404a';
            var url='https://api.instagram.com/v1/tags/'+$scope.keyword+'/media/recent';
            var request={
                jsonp:"JSON_CALLBACK",
                client_id:clientId
            };
            $http({
                method: 'JSONP',
                url: url,
                params:request
            }).success(function(result) {
                    $scope.data = result;
                }).error(function(data) {
                    alert('error');
                })

        };
    });