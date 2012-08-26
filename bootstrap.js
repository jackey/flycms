require.config({
	baseUrl: '/',
	paths: {
		backbone: 'lib/backbone',
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		templates: 'theme/default',
		app: 'app',
		fly: 'plugins/core/fly',
		layoutmanager: 'lib/backbone.layoutmanager',
		queryparams: 'lib/backbone.queryparams',
		jquerycookie: 'lib/jquery.cookie'
	},
	shim: {
		layoutmanager: ['backbone'],
		queryparams: ['backbone'],
		jquerycookie: ['jquery'],
		backbone: {
			deps: ['underscore', 'jquery', 'jquerycookie'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		},
		jquery: {
			exports: '$'
		}
	}
});

require(['app'], function (App) {
	App.initialize();
});