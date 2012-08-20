define(['htmlfly', 'jquery'], function (htmlfly, $) {
	return {
		routes: {
			'': 'homeHandler'
		},
		homeHandler: function () {
			require([htmlfly.getPath('module', 'system') + '/homev'], function (view) {
				view(function (HomeView) {
					var layout = htmlfly.getLayout();
					layout.setViews({
						'#app': new HomeView,
					});
					$('body').empty().append(layout.el);
					layout.render();
				});
			})
		}
	};
});