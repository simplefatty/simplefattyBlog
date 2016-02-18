!function(){"use strict";angular.module("sf_blog",["ui.router","ngTouch","ngSanitize","sf_blog.article","sf_blog.resources","sf_blog.service"]).config(["$logProvider","$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","IsDebug",function(t,n,e,o,r,a){o.html5Mode(!0),r.defaults.timeout=5e5,r.defaults.withCredentials=!0,r.interceptors.push("AuthInterceptor"),t.debugEnabled(a),e.otherwise("/")}])}(),function(){"use strict";angular.module("sf_blog").component("sfNavbar",{templateUrl:"app/components/navbar/navbar.html"})}(),function(){angular.module("sf_blog").directive("loadMore",["$timeout","$window","EVENT",function(t,n,e){return{restrict:"AE",link:function(o,r,a){angular.element(n).on("scroll",function(){var r=parseInt(document.body.scrollTop),a=parseInt(document.body.clientHeight);console.log(r,n.screen.height),r>=a-n.screen.height+50&&t(function(){o.$emit(e.NeedToLoad)},200,!0)})}}}])}()(function(){"use strict";angular.module("sf_blog").config(["$stateProvider",function(t){t.state("home",{url:"/",templateUrl:"app/components/main/main.html",controller:"MainController",controllerAs:"main"})}]).controller("MainController",["$scope","$timeout","Blog","Tags","EVENT",function(t,n,e,o,r){function a(o,r){t.isLoading=!0,e.getFrontBlogCount(o).then(function(n){t.blogCount=n.count,t.numPages=Math.ceil(t.blogCount/t.options.itemsPerPage)}),e.getFrontBlogList(o).then(function(e){for(var o in e.data){u=[];for(var a in e.data[o].tags)u.push(i[e.data[o].tags[a]]);console.log(l.versions.mobile),l.versions.mobile?e.data[o].image=e.data[o].images[0]:e.data[o].image=e.data[o].images[1],e.data[o].tagName=u.join(",")}n(function(){r?t.blogList=e.data:t.blogList=t.blogList.concat(e.data),t.isLoading=!1},0,!0)})["catch"](function(){t.isLoading=!1,t.blogList=[]})}var i={},u=[],l={versions:function(){var t=navigator.userAgent;return{mobile:!!t.match(/AppleWebKit.*Mobile.*/)||!!t.match(/AppleWebKit/)}}()};t.isLoading=!0,o.getFrontTagList().then(function(n){for(var e in n.data)i[n.data[e]._id]=n.data[e].name;a(t.options)}),t.blogList=[],t.options={currentPage:1,itemsPerPage:10,sortName:"publish_time",tagId:""},t.$on(r.NeedToLoad,function(){t.options.currentPage*t.options.itemsPerPage<t.blogCount&&(t.isLoading=!0,t.options.currentPage++,a(t.options))})}])})()(function(){"use strict";angular.module("sf_blog").component("sfLoading",{templateUrl:"app/components/loading/loading.html"})})(),function(){"use strict";angular.module("sf_blog").component("sfBanner",{templateUrl:"app/components/banner/banner.html"}).directive("tagContent",["$timeout",function(t){return{template:'<span ng-bind="tagName"></span>',scope:!0,replace:!0,link:function(n,e,o,r){function a(){i()}function i(){n.tagName=n.tagName.slice(0,-1),n.tagName.length?t(i,50,!0):t(function(){u(l())},100,!0)}function u(e){n.tagName=e.substring(0,n.tagName.length+1),n.tagName.length!=e.length?t(function(){u(e)},100,!0):t(a,5e3,!0)}function l(){return c[Math.floor(Math.random()*c.length)]}var c=["Front-End Developer","Designer","Programmer","Gamer","JavaScript Developer","HTML Developer","Web Programmer"];n.tagName=c[0],t(i,1e3,!0)}}}])}(),function(){"use strict";angular.module("sf_blog").component("sfFooter",{templateUrl:"app/components/footer/footer.html"})}(),function(){"use strict";angular.module("sf_blog.article",[]).config(["$stateProvider",function(t){t.state("article",{url:"/article/:aid",templateUrl:"app/components/article/article.html",controller:"ArticleCtrl"})}])}()(function(){"use strict";angular.module("sf_blog.article").controller("ArticleCtrl",["$rootScope","$scope","$state","Blog","$stateParams",function(t,n,e,o,r){n.aid=r.aid,n.aid||e.go("home"),o.getFrontArticle({id:n.aid}).then(function(t){n.article=t.data}).then(function(){var t={id:n.aid,sortName:"publish_time",tagId:""};o.getPrenext(t).then(function(t){n.next=t.data.next||{},n.prev=t.data.prev||{}})})["catch"](function(){e.go("home")})}])})()(function(){"use strict";angular.module("sf_blog.service",[])})(),function(){"use strict";angular.module("sf_blog.service").factory("AuthInterceptor",["$rootScope","$q","$location","$injector",function(t,n,e,o){return{}}])}(),function(){"use strict";angular.module("sf_blog.resources",["ngResource"])}(),function(){"use strict";angular.module("sf_blog.resources").factory("User",["$resource","ServerUrl",function(t,n){var e=t(n+"/users/:id/:controller",{id:"@_id"},{getCaptcha:{method:"GET",params:{id:"getCaptcha"}},get:{method:"GET",params:{id:"me"}},mdUser:{method:"PUT",params:{id:"mdUser"}},getUserProvider:{method:"GET",params:{id:"getUserProvider"}},snsLogins:{method:"GET",params:{id:"snsLogins"}}});return{get:e.get,getCaptcha:function(t){var n=t||angular.noop;return e.getCaptcha(function(t){return n(t)},function(t){return n(t)}).$promise},mdUser:function(t,n){var o=n||angular.noop;return e.mdUser(t,function(t){return o(t)},function(t){return o(t)}).$promise},getUserProvider:function(t){var n=t||angular.noop;return e.getUserProvider(function(t){return n(t)},function(t){return n(t)}).$promise},getLogins:function(t){var n=t||angular.noop;return e.snsLogins(function(t){return n(t)},function(t){return n(t)}).$promise}}}])}(),function(){"use strict";angular.module("sf_blog.resources").factory("Tags",["$resource","ServerUrl",function(t,n){var e=t(n+"/tags/:id/:controller",{id:"@_id"},{getFrontTagList:{method:"GET",params:{id:"getFrontTagList"}}});return{getFrontTagList:function(t){var n=t||angular.noop;return e.getFrontTagList(function(t){return n(t)},function(t){return n(t)}).$promise}}}])}(),function(){"use strict";angular.module("sf_blog.resources").factory("Comment",["$resource","ServerUrl",function(t,n){var e=t(n+"/comment/:id/:controller",{id:"@_id"},{getFrontCommentList:{method:"GET",params:{controller:"getFrontCommentList"}},addNewComment:{method:"POST",params:{id:"addNewComment"}},addNewReply:{method:"POST",params:{controller:"addNewReply"}},delReply:{method:"PUT",params:{controller:"delReply"}}});return{addNewComment:function(t,n){var o=n||angular.noop;return e.addNewComment(t,function(t){return o(t)},function(t){return o(t)}).$promise},getFrontCommentList:function(t,n){var o=n||angular.noop;return e.getFrontCommentList(t,function(t){return o(t)},function(t){return o(t)}).$promise},addNewReply:function(t,n,o){var r=o||angular.noop;return e.addNewReply({id:t},n,function(t){return r(t)},function(t){return r(t)}).$promise},delComment:function(t,n){var o=n||angular.noop;return e.remove(t,function(t){return o(t)},function(t){return o(t)}).$promise},delReply:function(t,n,o){var r=o||angular.noop;return e.delReply({id:t},n,function(t){return r(t)},function(t){return r(t)}).$promise}}}])}(),function(){"use strict";angular.module("sf_blog.resources").factory("Blog",["$resource","ServerUrl",function(t,n){var e=t(n+"/article/:id/:controller",{id:"@_id"},{getFrontBlogList:{method:"GET",params:{id:"getFrontArticleList"}},getFrontBlogCount:{method:"GET",params:{id:"getFrontArticleCount"}},getFrontArticle:{method:"GET",params:{controller:"getFrontArticle"}},getIndexImage:{method:"GET",params:{id:"getIndexImage"}},toggleLike:{method:"PUT",params:{controller:"toggleLike"}},getPrenext:{method:"GET",params:{controller:"getPrenext"}}});return{getFrontBlogList:function(t,n){var o=n||angular.noop;return e.getFrontBlogList(t,function(t){return o(t)},function(t){return o(t)}).$promise},getFrontBlogCount:function(t,n){var o=n||angular.noop;return e.getFrontBlogCount(t,function(t){return o(t)},function(t){return o(t)}).$promise},getFrontArticle:function(t,n){var o=n||angular.noop;return e.getFrontArticle(t,function(t){return o(t)},function(t){return o(t)}).$promise},getIndexImage:function(t){var n=t||angular.noop;return e.getIndexImage(function(t){return n(t)},function(t){return n(t)}).$promise},toggleLike:function(t,n){var o=n||angular.noop;return e.toggleLike(t,{},function(t){return o(t)},function(t){return o(t)}).$promise},getPrenext:function(t,n){var o=n||angular.noop;return e.getPrenext(t,function(t){return o(t)},function(t){return o(t)}).$promise}}}])}(),function(){return angular.module("sfBlog").constant("ServerUrl","http://api.jackhu.top").constant("IsDebug",!1).constant("CookieConfig",{domain:".jackhu.top"})}();