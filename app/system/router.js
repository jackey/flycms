define(['fly', 'jquery'], function (fly, $) {
	return {
		routes: {
			'': 'homeHandler'
		},
		homeHandler: function () {
			require([fly.getPath('module', 'system') + '/homev'], function (view) {
				view(function (HomeView) {
					var layout = fly.getLayout();
					layout.setView('#app', new HomeView);
					$('body').empty().append(layout.el);
					layout.render();
				});
			})
		}
	};
});