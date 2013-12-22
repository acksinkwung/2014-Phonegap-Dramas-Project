var angulargap = angular.module("angulargap", []);
angulargap.controller("HomeController", function ($scope,$http) {
    $scope.message = "AngularJS!";
    $scope.host = "";
    $scope.url = 'http://' + $scope.host + '/READ/HOT';
    
 	showData($scope,$scope.url);
 	function showData($scope,url) {
		setTimeout(function(){
		    Pace.ignore(function(){
	      	});
	    }, 3000);
	    try{
	    	$scope.selectDrama = JSON.parse(window.localStorage["selectDrama"]);
	    	$scope.selectDramaNum = JSON.parse(window.localStorage["selectDramaNum"]);
		}catch(err){

		}
			$http({method: 'GET', url: $scope.url}).success(function(data)
		{
		   $scope.dramas = data;
		}).error(function(data, status, headers, config) {
	      		
		});
  	}
  	$scope.select = function(id) {
		$scope.selectDrama = new Object();
	  	setTimeout(function(){
		    Pace.ignore(function(){
	        });
	    }, 3000);
	    $http({method: 'GET', url: 'http://' + $scope.host + '/api/v1/dramas/new_dramas_info.json?dramas_id=' + id }).success(function(data)
	    {
	      $scope.selectDrama.id = data[0].id;
	      $scope.selectDrama.name = data[0].name;  
	      $scope.selectDrama.introduction = data[0].introduction;
	      $scope.selectDrama.area_id = data[0].area_id;
	      $scope.selectDrama.actors = data[0].actors;
	      $scope.selectDrama.poster_url = data[0].poster_url;
	      $scope.selectDrama.year = data[0].year;
	      $scope.selectDrama.final = data[0].final;
	      $scope.selectDrama.eps_num_str = data[0].eps_num_str.split(",");
	      window.localStorage["selectDrama"] = JSON.stringify($scope.selectDrama);
	    }).error(function(data, status, headers, config) {
		});
  	}
  	$scope.view = function(id,num) {
		$scope.selectDramaNum = new Object();
		setTimeout(function(){
		    Pace.ignore(function(){
	        });
	    }, 3000);
	    $http({method: 'GET', url: 'http://' + $scope.host + '/api/v1/dramas/find_by_drama_and_ep_num.json?drama_id=' + id + '&num=' + num }).success(function(data)
	    {
	      	$scope.selectDramaNum = data;
	      	window.localStorage["selectDramaNum"] = JSON.stringify($scope.selectDramaNum);
	    }).error(function(data, status, headers, config) {
		});  	
	}
	
	$scope.play = function(id,num) {
		window.plugins.html5Video.play("video");
	}

  	$scope.hot = function() {
    	$scope.url = 'http://' + $scope.host + '/READ/HOT';
    	showData($scope,$scope.url);
    }
    $scope.new = function() {
    	$scope.url = 'http://' + $scope.host + '/READ/NEW';
    	showData($scope,$scope.url);
    }
  	$scope.tw = function() {
    	$scope.url = 'http://' + $scope.host + '/READ/TW/0/1000';
    	showData($scope,$scope.url);
    }
    $scope.ch = function() {
    	$scope.url = 'http://' + $scope.host + '/READ/CH/0/1000';
    	showData($scope,$scope.url);
  	}
  	$scope.kr = function() {
    	$scope.url = 'http://' + $scope.host + '/READ/KR/0/1000';
    	showData($scope,$scope.url);
  	}
  	$scope.jp = function() {
    	$scope.url = 'http://' + $scope.host + '/READ/JP/0/1000';
    	showData($scope,$scope.url);
  	}
});