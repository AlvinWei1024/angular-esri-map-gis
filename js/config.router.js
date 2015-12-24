'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          $urlRouterProvider
              .otherwise('/app/map');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.map', {
                  url: '/map',
                  templateUrl: 'tpl/map.html',
                  resolve: {
                      deps: ['uiLoad','$ocLazyLoad',
                          function( uiLoad,$ocLazyLoad){
                              //return $ocLazyLoad.load('js/app/map/map-controller.js');
                              return uiLoad.load( [
                                  //'js/services/esri.map.js'
                                  'js/directives/esri-basemap-gallery.js'
                                  ,'js/controllers/map-controller.js'
                                  ,'js/controllers/map.option.controller.js'
                                  ,'js/controllers/legend.js'
                                  ,'js/directives/measurement.js'
                                  ,'js/directives/draw.tool.js'
                                  ,'js/directives/centerat.js'
                                  ,'js/controllers/dataResultItem-controller.js'
                                  ,'js/controllers/dataResult.js'
                                  ,'js/directives/image-gallery.js',
                                  ,'js/directives/featureTable.js'
                                  ]).then(
                                  function(){
                                      return $ocLazyLoad.load('ngGrid');
                                  }
                              );
                          }]
                  }
              })
      }
    ]
  );