/**
 * Created by Sagar on 25/03/2015.
 */
angular.module('InstagramApp',[])
    .controller('InstagramController',function(InstagramService,$sce){
        var vm=this;
        vm.keyword='';
        vm.count=0;
        vm.data=null;

        vm.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
        vm.submit=function(){
            InstagramService.get(vm.keyword).then(function (result) {
                vm.data=result.data;
            }).catch(function (error) {
                console.log(error);
            })

        };
    }).service('InstagramService',function($q,$http){
        var result=null;
        return {
            'get':function(keyword){
                var deferred =$q.defer();
                var clientId='3e147fa6d878423d904ab741726c67a1';
                var url='https://api.instagram.com/v1/tags/'+keyword+'/media/recent';
                var request={
                    callback:"JSON_CALLBACK",
                    client_id:clientId
                };
            var defer =$q.defer();

                $http({
                    method: 'JSONP',
                    url: url,
                    params:request
                }).success(function(response) {
                    result=response;
                    deferred.resolve(result);
                }).error(function(error) {
                    deferred.reject(error) ;
            })
                return deferred.promise;
            }
        }

    });