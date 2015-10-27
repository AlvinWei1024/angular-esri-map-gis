app.controller('dataResultItemCtrl',['$scope',"$http",function ($scope,$http) {
    $scope.dataItem={};
    $scope.dataInfo={};
	$scope.resultItemShowState="hide";
	$scope.resultItemShow=false;
    $scope.expand=false;

    $scope.resultItemShowStateChange=function(){
        $scope.resultItemShow=!$scope.resultItemShow;
        if($scope.resultItemShow){
        	var data={showState:true};
            $scope.$emit("resultItem-to-main-showState",data);
        }
        else{
        	var data={showState:false};
            $scope.$emit("resultItem-to-main-showState",data);
        }
    };
    $scope.$watch('resultItemShow',function(){
        if($scope.resultItemShow){
            $scope.resultItemShowState="fadeInLeft";
        }
        else{
            $scope.resultItemShowState="fadeOutLeft hide";
        }
    })
    $scope.$on("main-to-resultItem-showState",function(event,res){
        $scope.resultItemShow=res.showState;
        if($scope.resultItemShow){
            $scope.title=res.data.name;
            $scope.dataItem=res.data.name;
            $scope.dataInfo=res.info;        
        }
    });


    $scope.myData=[
        {"name": "Moroni", "allowance": 505050505050505050},
        {"name": "Tiancum", "allowance": 53},
        {"name": "Jacob", "allowance": 27},
        {"name": "Nephi", "allowance": 29},
        {"name": "Enos", "allowance": 34},
        {"name": "Ether", "allowance": 42},
        {"name": "Alma", "allowance": 43},
        {"name": "Jared", "allowance": 21},
        {"name": "Moroni", "allowance": 50},
        {"name": "Tiancum", "allowance": 53},
        {"name": "Jacob", "allowance": 27},
        {"name": "Nephi", "allowance": 29},
        {"name": "Enos", "allowance": 34},
        {"name": "Ether", "allowance": 42},
        {"name": "Alma", "allowance": 43},
        {"name": "Jared", "allowance": 21},
        {"name": "Moroni", "allowance": 50},
        {"name": "Tiancum", "allowance": 53},
        {"name": "Jacob", "allowance": 27},
        {"name": "Nephi", "allowance": 29},
        {"name": "Enos", "allowance": 34},
        {"name": "Ether", "allowance": 42},
        {"name": "Alma", "allowance": 43},
        {"name": "Jared", "allowance": 21},
        {"name": "Moroni", "allowance": 50},
        {"name": "Tiancum", "allowance": 53},
        {"name": "Jacob", "allowance": 27},
        {"name": "Nephi", "allowance": 29},
        {"name": "Enos", "allowance": 34},
        {"name": "Ether", "allowance": 42}
    ]
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('js/data/largeLoad.json').success(function (largeLoad) {    
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
                $http.get('js/data/largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad,page,pageSize);
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

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true
        // ,totalServerItems: 'totalServerItems',
        // pagingOptions: $scope.pagingOptions,
        // filterOptions: $scope.filterOptions
    };
    


}])