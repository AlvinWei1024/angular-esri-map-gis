// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.14/esri/copyright.txt for details.
//>>built
define("esri/promiseList",["dojo/_base/array","dojo/Deferred","dojo/when"],function(g,k,m){var n=g.forEach;return function(d){function l(a,c){b[c]=a;f.progress([a,c]);0===--g&&f.resolve(b)}var c,a;d instanceof Array?a=d:d&&"object"===typeof d&&(c=d);var b,e=[];if(c){a=[];for(var h in c)Object.hasOwnProperty.call(c,h)&&(e.push(h),a.push(c[h]));b={}}else a&&(b=[]);if(!a||!a.length)return(new k).resolve(b);var f=new k;f.promise.always(function(){b=e=null});var g=a.length;n(a,function(a,b){c||e.push(b);
m(a,function(a){l(a,e[b])},function(a){l(a,e[b])})});return f.promise}});