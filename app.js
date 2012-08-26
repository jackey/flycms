define(['router', 'jquery', 'fly', 'text!app.xml', 'layoutmanager'], function (Router, $, fly, appXML) {
	//首先读取app.xml 拿到系统主题，模块的配置.
	var xmldoc = $.parseXML(appXML);
	var xml = $(xmldoc);
	var modules = [], system = {}, plugins = [];
	xml.find('modules module').each(function () {
		var isCore = ($.inArray($(this).attr('core'), ['true', 'false', 'TRUE', 'FALSE']) != -1) ? $(this).attr('core') : 'TURE';
		var folder = $(this).attr('path') ? $(this).attr('path') : 'app/';
		var module = {name:$(this).text(), isCore: isCore, folder: folder};
		modules.push(module);
	});
	xml.find('plugins plugin').each(function () {
		var folder = $(this).attr('folder');
		var entry = $(this).attr('entry');
		var name = $(this).attr('name');
		plugins.push({name: name, folder: folder, entry: entry});
	});
	system.name = xml.find('app').attr('name');
	system.theme = {name: xml.find('theme').attr('name'), folder: xml.find('theme').attr('folder')};

	//把系统配置放到fly全局对象去，这样就可以在所有的模块里面轻松的获取到.
	fly.setAppXML({system: system, modules: modules, plugins: plugins});

	// 对Backbone.[View][Model][Collection][Router]做fly特殊化
	Backbone.FlyView = Backbone.LayoutView.extend({
		destory: function () {
		    this.undelegateEvents();

		    $(this.el).removeData().unbind(); 

		    this.remove();
		    Backbone.View.prototype.remove.call(this);
		    return this;
		},
		// 增加全局的模版变量，比如当前登陆用户，用户是否登陆.
		processTemplateValues: function (data) {
			data || (data = {});
			return _.extend(data, {
				miscp: fly.getPath('theme', 'default') + "/misc",
				fly: fly
			});
		}
	});
	//一个主题一般有layout, 包括header, footer 部分.
	//在这里把Layout 视图事先创建，在各个模块调用就无需关心layout细节了.
	// TODO: 现在这种方式是不灵活的，将来可能会让layout 定义放在modules或者theme里面去.
	require([fly.getTpl('footer'), fly.getTpl('header'), fly.getTpl('layout')], function (footerTpl, headerTpl, layoutTpl) {
		var FooterView = Backbone.FlyView.extend({
			template: footerTpl,
			render: function () {
				if (_.isFunction(this.destory)) {
					this.destory();
				}
				$(this.el).append(_.template(this.template, this.processTemplateValues()));
			},
			initialize: function () {
				// TODO:
			}
		});

		var HeaderView = Backbone.FlyView.extend({
			template: headerTpl,
			render: function () {
				if (_.isFunction(this.destory)) {
					this.destory();
				}
				$(this.el).append(_.template(this.template, this.processTemplateValues()));
			},
			initialize: function () {
				// TODO:
			}
		});

		// Global configuration.
		Backbone.LayoutManager.configure({
			fetch: function (path) {
				if (path[0] == '.' || path[0] == '#') {
					return _.template($(path).html());
				}
				else {
					return _.template(path);
				}
			},
			render: function (template, context) {
				context = Backbone.FlyView.prototype.processTemplateValues.call(this, context);
    			return template(context);
			}
		});

		fly.setLayout({
			// 这里我用normal去做为默认的Layout.
			// 还可以定义其他的Layout.
			'normal': Backbone.LayoutManager.extend({
				template: layoutTpl,
				views: {
					'#footer': new FooterView(),
					'#header': new HeaderView(),
				},
				fetch: function (path) {
					if (path[0] == '.' || path[0] == '#') {
						return _.template($(path).html());
					}
					else {
						return _.template(path);
					}
				}
			})
		});
	});

	return {
		//初始化工作完成了，该启动路由了.
		initialize: function () {
			Router.initialize();
		}
	};
});