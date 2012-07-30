define(function () {
	var Todo = Backbone.Model.extend({
		defaults: {
			todo: '',
		},
		initialize: function () {

		}
	});

	var TodoList = Backbone.Collection.extend({
		initialize: function () {
			
		}
	});

	return {
		Todo: Todo,
		TodoList: TodoList
	};
});