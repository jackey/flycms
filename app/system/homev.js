define(['fly'], function (fly) {
	// 首页视图.
	return function (callback) {
		require([fly.getTpl('home')], function (tpl) {
			var HomeView = Backbone.FlyView.extend({
				template: tpl,
				render: function (manage) {
					return manage(this).render({});
				}
			});
			callback(HomeView);
		});
	}
});