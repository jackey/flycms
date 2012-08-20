define(['backbone', 'jquery', 'htmlfly', 'underscore'] ,function (backbone, $, htmlfly, _) {
	return {
		initialize: function () {
			var appRoutes = {},
				appHandlers = {},
				AppRouter = Backbone.Router.extend({});

			var tmpModules = _.clone(htmlfly.getAppXML()['modules']);
			(function loadModule() {
				var entity = tmpModules.shift();
				if (_.isUndefined(entity)) {
					AppRouter = AppRouter.extend({
						routes: appRoutes
					});
					AppRouter = AppRouter.extend(appHandlers);

					callbackWhenLoadedModule();
				}
				else {
					require([entity.folder + entity.name + '/router'], function (module) {
						//加载路由.
						if (typeof module['routes'] != 'undefined') {
							var routes = _.keys(module.routes);
							_.each(routes, function (route) {
								// 设置路由处理事件的执行环境.
								var handler = module.routes[route];
								var path = route;
								var appendRoutes = {}, appendHandler = {};
								appendRoutes[path] = handler;
								appendHandler[handler] = module[handler];
								appRoutes = _.extend(appRoutes, appendRoutes);
								appHandlers = _.extend(appHandlers, appendHandler);
							});
						}

						loadModule();
					}, function (err) {
						htmlfly.error(err.toString());
					});
				}
			})();

			function callbackWhenLoadedModule() {
				var router = new AppRouter();
				htmlfly.setAppRouter(router);
				Backbone.history.start();
			}
		}
	};
});