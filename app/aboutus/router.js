define(function () {
	function getSelfPath() {
		var name = 'aboutus';
		_.each(window.gypsii.modules, function (module) {
			if (name == module['name']) {
				defaultSelfPath = module['path'] + module['name'] + '/';
			}
		});
		return defaultSelfPath;
	}
	return {
		routes: {
			'aboutus': 'aboutusHandler',
		},
		aboutusHandler: function () {
			var modulepath = getSelfPath(this.modules);
			var self = this;
			require([modulepath + 'view'], function (Views) {
				var aboutus = new Views.Aboutus();
				aboutus.render();
			});
		}
	}
});