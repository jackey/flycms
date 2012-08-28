({
	baseUrl: './',
	paths: {
		backbone: 'lib/backbone',
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		templates: 'theme/default',
		fly: 'plugins/core/fly',
		layoutmanager: 'lib/backbone.layoutmanager',
		queryparams: 'lib/backbone.queryparams',
		jquerycookie: 'lib/jquery.cookie'
	},
	findNestedDependencies: true,
	optimize: "none",
	name: 'lib/almond',
	include: ['bootstrap'],
	out: 'production.js',
})
