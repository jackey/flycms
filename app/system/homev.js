define(['htmlfly'], function (htmlfly) {
	// 首页视图.
	return function (callback) {
		require([htmlfly.getTpl('home')], function (tpl) {
			var HomeView = Backbone.HtmlflyView.extend({
				template: tpl,
				render: function (manage) {
					return manage(this).render({});
				}
			});
			callback(HomeView);
		});
	}
});