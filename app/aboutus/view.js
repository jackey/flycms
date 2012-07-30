define(function () {
	var getTpl = function (name) {
		if (typeof name == 'undefined') return false;
		var themePath = window.gypsii.system.theme.folder + window.gypsii.system.theme.name;
		return 'text!' + themePath + '/' + name + '.html';
	}

	function getSelfPath() {
		var name = 'home';
		var defaultSelfPath = 'app/home';
		_.each(window.gypsii.modules, function (module) {
			if (name == module['name']) {
				defaultSelfPath = module['path'] + module['name'] + '/';
			}
		});
		return defaultSelfPath;
	}

	var Aboutus = Backbone.View.extend({
		render: function () {
			var view = this;
			require([getTpl('aboutus')], function (tpl) {
				var compiled = _.template(tpl);
				$(view.el).empty().append(compiled);
			});
		},
		initialize: function () {
			_.bindAll(this, 'render');
		},
		el: $('#app')
	});

	return {
		Aboutus: Aboutus
	}
});