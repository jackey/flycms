define(function () {
	function getSelfPath() {
		var name = 'home';
		_.each(window.gypsii.modules, function (module) {
			if (name == module['name']) {
				defaultSelfPath = module['path'] + module['name'] + '/';
			}
		});
		return defaultSelfPath;
	}
	return {
		routes: {
			'home': 'homeHandler',
		},
		homeHandler: function () {
			var modulepath = getSelfPath();
			var self = this;
			require([modulepath + 'view'], function (Views) {
				var list = new Views.List();
				list.render();
			});
		}
	}
});