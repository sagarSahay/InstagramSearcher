/**
 * Created by Sagar on 25/03/2015.
 */
angular.module('InstagramApp',[])
    .controller('InstagramController',function($scope,$http,$q){
              $scope.keyword='';
        $scope.count=0;

        function callInstagram(){

            var clientId='2a4fac4d6fbb48b890085ad5f873404a';
            var url='https://api.instagram.com/v1/tags/'+$scope.keyword+'/media/recent';
            var request={
                callback:"JSON_CALLBACK",
                client_id:clientId
            };
            var defer =$q.defer();

            $http({
                method: 'JSONP',
                url: url,
                params:request
            }).success(function(result) {
                $scope.data = result;
                $scope.count=result.length;
            }).error(function(data) {
                alert('error');
            })
        }

        $scope.submit=function(){


        };
    });