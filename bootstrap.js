// 1. 加载系统必须模块

// 2. 设置系统router

// 3. 查找模块匹配router

// 4. 执行

require.config({
	paths: {
		backbone: 'lib/backbone',
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		templates: 'theme/default',
		app: 'app'
	},
	shim: {
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

require(['app'], function (App) {
	App.initialize();
});