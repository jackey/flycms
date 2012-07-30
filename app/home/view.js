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

	var List = Backbone.View.extend({
		render: function () {
			var view = this;
			require([getTpl('home'), getSelfPath() + 'model'], function (tpl, Model) {
				var todoList = new Model.TodoList();
				todoList.add({todo: 'go work'});
				todoList.add({todo: 'go lunch'});
				todoList.add({todo: 'go Dinner'});
				var compiled = _.template(tpl, {todoList: todoList});
				$(view.el).empty().append(compiled);
			});
		},
		initialize: function () {
			_.bindAll(this, 'render');
		},
		el: $('#app')
	});

	return {
		List: List
	}
});