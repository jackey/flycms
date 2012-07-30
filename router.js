define(['backbone', 'jquery', 'text!app.xml'] ,function (backbone, $, modules) {
	var xmldoc = $.parseXML(modules);
	var xml = $(xmldoc);
	var modules = [], system = {};
	xml.find('module').each(function () {
		var isCore = ($.inArray($(this).attr('core'), ['true', 'false', 'TRUE', 'FALSE']) != -1) ? $(this).attr('core') : 'TURE';
		var path = $(this).attr('path') ? $(this).attr('path') : 'app/';
		var module = {name:$(this).text(), isCore: isCore, path: path};
		modules.push(module);
	});
	system.name = xml.find('app').attr('name');
	system.theme = {name: xml.find('theme').attr('name'), folder: xml.find('theme').attr('folder')};
	return {
		initialize: function () {
			var executeContext = window.gypsii = {system: system, modules: modules};
			var appRoutes = {},
				appHandlers = {},
				AppRouter = Backbone.Router.extend({});

			var tmpModules = _.clone(modules);
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
					require([entity.path + entity.name + '/router'], function (module) {
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

						loadModule();
					});
				}
			})();

			function callbackWhenLoadedModule() {
				var router = new AppRouter();
				Backbone.history.start();
			}
		}
	};
});