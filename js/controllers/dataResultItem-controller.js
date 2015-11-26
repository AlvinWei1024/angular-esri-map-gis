app.controller('dataResultItemCtrl',['$scope',"$http","$timeout",function ($scope,$http,$timeout) {
    $scope.dataItem={};
    $scope.dataInfo={};
	$scope.resultItemShowState="hide";
	$scope.resultItemShow=false;
    $scope.expand=false;
    $scope.firstInit=0;

    $scope.fullExtent=function(){
        $scope.expand=!$scope.expand;
        angular.element(window).resize();
        
    };
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
        if(!$scope.firstInit++){
            return;
        }
        if($scope.resultItemShow){
            $scope.resultItemShowState="fadeInLeft";
        }
        else{
            $scope.resultItemShowState="fadeOutLeft";
            setTimeout(function(){
                $scope.$apply(function () {
                 　　$scope.resultItemShowState="hide";
                });
            },500);
            
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
    $scope.$on("main-to-resultItem-isGalleryOpen",function(event,res){
        $scope.expand=res;
    });
    var reqData={
        dataInfo:"",
        dataGrid:"",
        dataImage:""
    };

    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    $scope.myData=[
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "泰山站", "温度": 27, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "泰山站", "温度": 27, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "泰山站", "温度": 27, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "泰山站", "温度": 27, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "泰山站", "温度": 27, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "南极站", "温度": 50, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "中山站", "温度": 53, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44},
        {"站点": "长城站", "温度": 29, "盐度":44, "湿度":44, "风速":44, "风向":44, "研究单位":44, "水深":44}
    ]
    function getTitles(arr){
        if(!arr||!arr.length||typeof arr[0]!="object"){
            console.log(typeof arr[0])
            return null;
        }
        var title=[];
        for(var key in arr[0]){
            title.push(key);
        }
        return title;
    }
    $scope.titles=getTitles($scope.myData);
    $scope.locationTo=function(data){
        console.log(data);
    }
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 15],
        pageSize: 15,
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
        ,totalServerItems: 'totalServerItems'
        ,pagingOptions: $scope.pagingOptions
        ,filterOptions: $scope.filterOptions
    };
    

    $scope.images=[
        {
            src:"img/imgs/1.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/10.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/11.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/12.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/13.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/14.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/15.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/2.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/3.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/4.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/5.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/6.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/7.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/8.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/9.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/10.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        },
        {
            src:"img/imgs/11.jpg",
            discription:"这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述"
        }
    ];


}])