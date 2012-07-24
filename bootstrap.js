//require.js 的全局配置.
require.config({
	baseUrl: 'app',
	paths: {
		// TODO:我们在这里添加app的代码文件
	}
});

//载入系统依赖库.
var deps = ['/lib/underscore.js', '/lib/json2.js', 'lib/jquery.js', '/lib/backbone.js'];
requirejs(deps, function () {
	//载入依赖库后，我们将请求分发到不同的路由处理模块中去.
	// 因为是第一个版本，做简单点:
	// 路由规则是: module/action/:param1/:param2...
	// 暂时不接受复杂字符的参数和module名字.
	new Backbone.Router({
		routes: {
			'app': 'appDispatcher'
		},
		appDispatcher: function (module, action) {
			console.log('hello');
		}
	});
	var global = {};
	Backbone.history.start({pushState: true});
});