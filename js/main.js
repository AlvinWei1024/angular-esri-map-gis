'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 
    function(              $scope,   $translate,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: '极地空间资源共享服务平台 ',
        version: '2.0.0',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-info',
          navbarCollapseColor: 'bg-info',
          asideColor: 'bg-light',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false,
          resultPanel:false,
          resultItemPanel:false
        }
      };
      $scope.$on("nav-to-main-showState",function(event,msg){
          $scope.$broadcast("main-to-result-showState", msg);
      });
      
      $scope.$on("result-to-main-stateChanged",function(event,msg){
        if(msg){
          $scope.app.settings.resultPanel=true;//设置当前状态为数据结果面板：true
        }
        else{
          $scope.app.settings.resultPanel=false;////false
        }
      });


     $scope.$on("resultChangeMapMessageFromBaseMapGallery",function(event,msg){
        $scope.$broadcast("resultChangeMapMessageFromMain", msg);
      });


     $scope.$on("resultItem-to-main-showState",function(event,res){

        if(!res){
          return;
        }
        if(res.showState){
          
          $scope.app.settings.resultItemPanel=true;////设置当前状态为数据结果面板：true
        }
        else{
          $scope.app.settings.resultItemPanel=false;////false
        }
        $scope.$broadcast("main-to-resultItem-showState", res);
      });

    //legend
      $scope.$on("resultAddInLegendFromDataResult",function(event,data){
            $scope.$broadcast("resultAddInLegendFromMain", data);
        });
       $scope.$on("resultDelInLegendFromDataResult",function(event,data){
            $scope.$broadcast("resultDelInLegendFromMain", data);
        });
        $scope.$on("resultDelInDataResultFromLegend",function(event,data){
            $scope.$broadcast("resultDelInDataResultFromMain", data);
        });









      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);