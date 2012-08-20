define(['jquery', 'swipe', 'queryparams', 'jquerycookie'], function ($) {
	// Copy from Olex.
	var	Mask = window.Mask = {
		Maskid:"mask",
		MaskAlertId:'maskAlert',
		defaultwidth:200,
		defaultHeight:70,
		maskPublic:function(w,h){
				this.Close();
				if( w ==undefined){w = this.defaultwidth; h = this.defaultHeight;}
				var getDocumentHeight = $(document).height();
				var getW = $(window).width();
				var getH = $(window).height();
				var getScrollH = $(document).scrollTop();
				var tString = new String();
				  tString ='<div class="mask"  id="'+Mask.Maskid+'"></div><div class="maskAlert" id="'+Mask.MaskAlertId+'"></div>';
				$("body").append(tString);
				$("#"+Mask.Maskid).css({"height":getDocumentHeight});
				var getAlertWidth = w;
				var getAlertHeight = parseInt(h)+32;
				var getAlertLeft;
					if(getW <= getAlertWidth ){getAlertLeft =0; }else{getAlertLeft =(getW-getAlertWidth)/2;	}
				var getAlertTop= (getH - getAlertHeight)/2;
				$("#"+Mask.MaskAlertId).css({"left":getAlertLeft, "top":(getAlertTop+getScrollH),"width":w,"height":h});
				$("#"+Mask.Maskid).css({"background":"-webkit-radial-gradient(  center "+(getAlertTop+getScrollH+130)+"px, rgba(0,0,0,0.2),rgba(0,0,0,0.9)70%)"}); // 针对webKit内核浏览做的效果
				$("#"+Mask.Maskid).fadeIn(300);
				$("#"+Mask.MaskAlertId).fadeIn(800);	
		},
		Loading:function(type){
					this.maskPublic(200,30);
					var tArray= ['正在加载中...', '正在上传中...','正在发送中...','正在登录中...'];	
					if(type==undefined){ type=0}
					$("#"+Mask.MaskAlertId).html('<div><img src="/images/loading.gif" class="mj" />&nbsp;'+tArray[type]+'</div>');
			
		},
		Close:function(){
				if(($("#"+Mask.Maskid).attr("id")==Mask.Maskid) || ($("#"+Mask.MaskAlertId).attr("id")==Mask.MaskAlertId)){
						$("#"+Mask.Maskid).remove();
						$("#"+Mask.MaskAlertId).remove();
				}
		}, 
		Comfire:function(txt,Fun){
				this.maskPublic(200, 100);
				$("#"+Mask.MaskAlertId).html('<div class="tsTxt">'+txt+'</div><div class="nj"><a href="javascript:'+Fun+';" class="sure">确定</a><a href="javascript:Mask.Close();" class="sure">取消</a></div>');
		},
		Alert:function(txt,time){
			this.maskPublic();
			$("#"+Mask.MaskAlertId).html('<div id="MaskContent"><div class="tsTxt" style="text-align:center;">'+txt+'</div><div class="nj"><a href="javascript:Mask.Close();" class="sure">确定</a></div></div>');
			var getContentHeight= $("#MaskContent").height();
			if(getContentHeight> this.defaultHeight){
				$("#"+Mask.MaskAlertId).css({"height":getContentHeight});
				$("#MaskContent .tsTxt").css({"text-align":"left"});
			}
			if(time!= undefined){setTimeout(function(){Mask.Close()},1000*time)}
		},
		More:function(id){
			this.maskPublic(200, 125);
			 var getMore= $("#more_"+id).html();
			$("#"+Mask.MaskAlertId).html('<div class="nj" id="funId">'+getMore+'<a href="javascript:Mask.Close();" class="sure">取消</a></div>');
				var getContentHeight= $("#funId").height();
				
				if(getContentHeight> 125){
				$("#"+Mask.MaskAlertId).css({"height":getContentHeight+10});
			
			}
		},
		Popup:function(uid,huifu){
			this.maskPublic(200, 125);	
			$("#"+Mask.MaskAlertId).html('<div id="MaskContent"><div class="nj"><a href="/people/people.php?id='+uid+'" class="sure">Ta的主页</a><a href="'+huifu+'" class="sure">回复评论</a><a href="javascript:Mask.Close();" class="sure">取消</a></div></div>');
			
		}	
	}

	function localstorage() {
		var storage = window.localStorage;

		if (!storage) {
			function memcache() {

			}
			storage = new memcache();
		}

		return function () {
			return storage;
		}
	}

	function Gypsii() {
		this.appXML = {};
		this.layouts = {};
		this.server = '/backend/index.php';
		this.appRouter = null;
		this.mask = Mask;
		this.cache = localstorage();
	}

	Gypsii.prototype.setAppXML = function (xml) {
		_.extend(this.appXML, xml);
	}

	Gypsii.prototype.setAppRouter = function (router) {
		this.appRouter = router; 
	}

	Gypsii.prototype.getAppRouter = function () {
		return this.appRouter;
	}

	Gypsii.prototype.getAppXML = function () {
		return this.appXML;
	}

	Gypsii.prototype.getPath = function (type, name) {
		name || (name = '');
		var modules = this.appXML.modules;
		var path = '';
		if (type == 'module') {
			_.each(modules, function (module) {
				if (module['name'] == name) {
					path = module['folder'] + module['name'];
				}
			});
		}
		else if (type == 'plugin') {
			var plugins = this.appXML.plugins;
			_.each(plugins, function (plugin) {
				if (plugin['name'] == name) {
					path = plugin['folder'] + '/' + plugin['name'] + '/' + plugin['entry'] + '.js';
				}
			});
		}
		else if (type == 'theme') {
			return this.appXML.system.theme['folder'] + this.appXML.system.theme['name']; 
		}
		return path;
	}

	Gypsii.prototype.pageTransition = function (to) {
		// TODO:我需要更优美的页面效果
	}

	Gypsii.prototype.setLayout = function (layout) {
		if (!_.isObject(layout)) return false;

		_.each(layout, function (value, key) {
			this.layouts[key] = new value;
		}, this);
	}

	Gypsii.prototype.getLayout = function (name) {
		name || (name = "normal");
		if (!_.isUndefined(this.layouts[name])) {
			return this.layouts[name];
		}
		return false;
	}

	Gypsii.prototype.url = function(path, options) {
		options || (options = {});
		return '/#/'+ Backbone.Router.prototype.toFragment.apply(new Backbone.Router(), arguments);
	}

	Gypsii.prototype.goto = function (path, options) {
		options || (options = {});
		var url = Backbone.Router.prototype.toFragment.apply(new Backbone.Router(), arguments);
		var appRouter = this.getAppRouter();
		appRouter.navigate(url, {trigger: true, replace: true});
	}

	Gypsii.prototype.getTpl = function (name) {
		if (typeof name == 'undefined') return false;
		var themePath = this.appXML.system.theme.folder + this.appXML.system.theme.name;
		return 'text!' + themePath + '/' + name + '.html';
	}

	/**
	 * 这个方法是和后台交互的唯一入口，需要做复杂逻辑判断.
	 * 首先，我们应该从cookie里获取sid.
	 * 我们也允许用户从data传递sid 来覆盖掉默认的cookie sid.
	 * TODO:我们也要做一个token, 来确定访问是从我们自己的网站 而不是第三方过来.
	 */
	Gypsii.prototype.jsonCall = function (cmd, data, callback) {
		var self = this;
		var sid = $.cookie('sid');
		if (data.sid) {
			sid = data.sid;
			delete data.sid;
		}
		if (_.isUndefined(sid) || _.isEmpty(sid)) {
			sid = '-1';
		}
		var jsonData = this.stringify({cmd: cmd, sid: sid, data: data});
		/**
		 * 参考: http://api.jquery.com/category/deferred-object 获得defered用法.
		 */
		$.ajax(this.server, {
			type: 'POST',
			data: {json: jsonData}
		})
		.done(function (response, status, xhr) {
			try  {
				var jsonData = self.parseJSON(response);
				callback('success', jsonData);
			}
			catch (e) {
				callback('success', response);
			}
		})
		.fail(function (error) {
			callback('error', error);
		})
		.always(function () {
			callback('complete');
		});
	}

	Gypsii.prototype.parseJSON = function (str) {
		if (!str) str = '';
		return $.parseJSON(str);
	}

	Gypsii.prototype.stringify = function (json) {
		return JSON.stringify(json);
	}

	/**
	 * 载入一个plugin.
	 */
	Gypsii.prototype.loadPlugin = function (name, fn) {
		fn || (fn = function () {});
		if (typeof name == 'undefined') fn(null);
		var path = this.getPath('plugin', name);
		require([path], function (plugin) {
			fn(plugin);
		});
	}

	return new Gypsii();
});