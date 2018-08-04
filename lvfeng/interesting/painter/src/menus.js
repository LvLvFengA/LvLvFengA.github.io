
var menus = {
	"&文件": [
		{
			item: "&新建",
			shortcut: "Ctrl+N",
			action: file_new,
			description: "创建新文档.",
		},
		{
			item: "&打开",
			shortcut: "Ctrl+O",
			action: file_open,
			description: "打开现有文档.",
		},
		{
			item: "&从URL获取",
			// shortcut: "Ctrl+L",
			action: file_load_from_url,
			description: "从Web打开图像.",
		},
		{
			item: "&保存",
			shortcut: "Ctrl+S",
			action: file_save,
			description: "保存活动文档.",
		},
		{
			item: "&另存为",
			shortcut: "Ctrl+Shift+S",
			//shortcut: "",
			action: file_save_as,
			description: "用新名称保存活动文档.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&打印预览",
			action: function(){
				print();
			},
			description: "打印活动文档并设置打印选项.",
			//description: "Displays full pages.",
		},
		{
			item: "&页面设置",
			action: function(){
				print();
			},
			description: "打印活动文档并设置打印选项.",
			//description: "Changes the page layout.",
		},
		{
			item: "&打印",
			shortcut: "Ctrl+P",
			action: function(){
				print();
			},
			description: "打印活动文档并设置打印选项.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&设置为墙纸（平铺）",
			action: set_as_wallpaper_tiled,
			description: "将此位图作为桌面背景绘制.",
		},
		{
			item: "&设置为墙纸（居中）",
			action: set_as_wallpaper_centered,
			description: "Centers this bitmap as the desktop background.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&管理存储",
			action: manage_storage,
			description: "管理先前创建或打开的图片的存储.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&最近文件",
			enabled: false, // @TODO for chrome app
			description: "",
		},
		$MenuBar.DIVIDER,
		{
			item: "&退出",
			shortcut: "Alt+F4",
			action: function(){
				close();
			},
			description: "退出画图.",
		}
	],
	"&编辑": [
		{
			item: "&撤销",
			shortcut: "Ctrl+Z",
			enabled: function(){
				return undos.length >= 1;
			},
			action: undo,
			description: "撤消最后一个动作.",
		},
		{
			item: "&重做",
			shortcut: "F4",
			enabled: function(){
				return redos.length >= 1;
			},
			action: redo,
			description: "重做以前未完成的动作.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&剪切",
			shortcut: "Ctrl+X",
			enabled: function(){
				// @TODO disable if no selection (image or text)
				return (typeof chrome !== "undefined") && chrome.permissions;
			},
			action: function(){
				document.execCommand("cut");
			},
			description: "剪切选择并将其放在剪贴板上.",
		},
		{
			item: "&复制",
			shortcut: "Ctrl+C",
			enabled: function(){
				// @TODO disable if no selection (image or text)
				return (typeof chrome !== "undefined") && chrome.permissions;
			},
			action: function(){
				document.execCommand("copy");
			},
			description: "复制选择并将其放在剪贴板上.",
		},
		{
			item: "&粘贴",
			shortcut: "Ctrl+V",
			enabled: function(){
				return (typeof chrome !== "undefined") && chrome.permissions;
			},
			action: function(){
				document.execCommand("paste");
			},
			description: "粘贴到画板.",
		},
		{
			item: "&清除选择",
			shortcut: "Del",
			enabled: function(){ return !!selection; },
			action: delete_selection,
			description: "删除选择.",
		},
		{
			item: "&选择所有",
			shortcut: "Ctrl+A",
			action: select_all,
			description: "选择所有.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&复制到...",
			enabled: function(){ return !!selection; },
			action: save_selection_to_file,
			description: "将选定内容复制到文件中.",
		},
		{
			item: "&从...粘贴",
			action: paste_from_file_select_dialog,
			description: "将文件粘贴到选择中.",
		}
	],
	"&视图": [
		{
			item: "&工具箱",
			shortcut: "Ctrl+T",
			checkbox: {
				toggle: function(){
					$toolbox.toggle();
				},
				check: function(){
					return $toolbox.is(":visible");
				},
			},
			description: "显示或隐藏工具箱.",
		},
		{
			item: "&调色板",
			shortcut: "Ctrl+L",
			checkbox: {
				toggle: function(){
					$colorbox.toggle();
				},
				check: function(){
					return $colorbox.is(":visible");
				},
			},
			description: "显示或隐藏调色板.",
		},
		{
			item: "&状态栏",
			checkbox: {
				toggle: function(){
					$status_area.toggle();
				},
				check: function(){
					return $status_area.is(":visible");
				},
			},
			description: "显示或隐藏状态栏.",
		},
		{
			item: "&文本工具栏",
			enabled: false, // @TODO
			checkbox: {},
			description: "显示或隐藏文本工具栏.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&附加菜单",
			checkbox: {
				toggle: function(){
					$extras_menu_button.toggle();
					try{
						localStorage["jspaint extras menu visible"] = this.check();
					}catch(e){}
				},
				check: function(){
					return $extras_menu_button.is(":visible");
				}
			},
			description: "显示或隐藏额外菜单.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&缩放",
			submenu: [
				{
					item: "&正常尺寸",
					shorcut: "Ctrl+PgUp",
					description: "缩放图片到 100%.",
					enabled: function(){
						return magnification !== 1;
					},
					action: function(){
						set_magnification(1);
					},
				},
				{
					item: "&放大",
					shorcut: "Ctrl+PgDn",
					description: "缩放图片到 400%.",
					enabled: function(){
						return magnification !== 4;
					},
					action: function(){
						set_magnification(4);
					},
				},
				{
					item: "&固定...",
					enabled: false, // @TODO
					description: "缩放图片.",
				},
				$MenuBar.DIVIDER,
				{
					item: "&显示与网格",
					shorcut: "Ctrl+G",
					enabled: false, // @TODO
					checkbox: {},
					description: "显示或隐藏网格.",
				},
				{
					item: "&显示缩略图",
					enabled: false, // @TODO
					checkbox: {},
					description: "显示或隐藏图片的缩略图视图.",
				}
			]
		},
		{
			item: "&查看位图",
			shortcut: "Ctrl+F",
			action: view_bitmap,
			description: "显示整个图片.",
		}
	],
	"&图像": [
		{
			item: "&翻转/旋转",
			shortcut: "Ctrl+R",
			action: image_flip_and_rotate,
			description: "翻转或旋转图片或选择.",
		},
		{
			item: "&拉伸/歪斜",
			shortcut: "Ctrl+W",
			action: image_stretch_and_skew,
			description: "拉伸或歪斜图片或选择.",
		},
		{
			item: "&反色",
			shortcut: "Ctrl+I",
			action: image_invert,
			description: "反转图片或选择的颜色.",
		},
		{
			item: "&属性...",
			shortcut: "Ctrl+E",
			action: image_attributes,
			description: "更改图片的属性.",
		},
		{
			item: "&清除图像",
			shortcut: "Ctrl+Shift+N",
			//shortcut: "Ctrl+Shft+N", [sic]
			action: clear,
			description: "清除选择的图片.",
		},
		{
			item: "&不透明",
			checkbox: {
				toggle: function(){
					transparent_opaque = {
						"opaque": "transparent",
						"transparent": "opaque",
					}[transparent_opaque];
					
					$G.trigger("option-changed");
				},
				check: function(){
					return transparent_opaque === "opaque";
				},
			},
			description: "使当前选择不透明或透明.",
		}
	],
	"&颜色": [
		{
			item: "&编辑颜色...",
			action: function(){
				$colorbox.edit_last_color();
			},
			description: "创建一个新颜色.",
		},
		{
			item: "&获取颜色",
			action: function(){
				get_FileList_from_file_select_dialog(function(files){
					var file = files[0];
					Palette.load(file, function(err, new_palette){
						if(err){
							show_error_message("此文件不是画图可以识别的格式，或者没有找到颜色。");
						}else{
							palette = new_palette;
							$colorbox.rebuild_palette();
						}
					});
				});
			},
			description: "使用先前保存的颜色调色板.",
		},
		{
			item: "&保存颜色",
			action: function(){
				var blob = new Blob([JSON.stringify(palette)], {type: "application/json"});
				saveAs(blob, "colors.json");
			},
			description: "将当前颜色调色板保存到文件.",
		}
	],
	"&帮助": [
		{
			item: "&帮助主题",
			action: show_help,
			description: "显示当前任务或命令的帮助.",
		},
		$MenuBar.DIVIDER,
		{
			item: "&关于画图",
			action: function(){
				var $msgbox = new $Window();
				$msgbox.title("About Paint");
				$msgbox.$content.html(
					"<h1><img src='images/icons/32.png'/> JS 画图<hr/></h1>" +
					"<p>JS 画图，基于web浏览器的画图小例子，作者 <a href='http://1j01.github.io/'>以赛亚·奥德纳</a>.</p>" +
					"<p>你可以查看这个项目 <a href='https://github.com/1j01/jspaint'>在 github上</a>.</p>"
				).css({padding: "15px"});
				$msgbox.center();
			},
			description: "显示有关此应用程序的信息.",
			//description: "Displays program information, version number, and copyright.",
		}
	],
	"&其他": [
		{
			item: "&将历史渲染为GIF",
			// shortcut: "Ctrl+Shift+G",
			action: render_history_as_gif,
			description: "从文档历史创建动画.",
		},
		// {
		// 	item: "Render History as &APNG",
		// 	// shortcut: "Ctrl+Shift+A",
		// 	action: render_history_as_apng,
		// 	description: "Creates an animation from the document history.",
		// },
		// {
		// 	item: "&Additional Tools",
		// 	action: function(){
		// 		// ;)
		// 	},
		// 	description: "Enables extra editing tools.",
		// },
		// {
		// 	item: "&Preferences",
		// 	action: function(){
		// 		// :)
		// 	},
		// 	description: "Configures JS Paint.",
		// }
		{
			item: "&分享",
			submenu: [
				{
					item: "&从文档开始的新会话",
					action: function(){
						var name = prompt("输入将在共享的URL中使用的会话名称.");
						if(typeof name == "string"){
							name = name.trim();
							if(name == ""){
								show_error_message("会话名称不能为空。");
							}else if(name.match(/[.\/\[\]#$]/)){
								show_error_message("会话名称不能包含任何 ./[]#$");
							}else{
								location.hash = "session:" + name;
							}
						}
					},
					description: "从当前文档开始新的多人会话.",
				},
				{
					item: "&新的会话",
					action: function(){
						show_error_message("尚未支持");
					},
					enabled: false,
					description: "从空文档启动一个新的多人会话.",
				},
			]
		},
		{
			item: "&主题",
			submenu: [
				{
					item: "&经典",
					action: function(){
						set_theme("classic.css");
					},
					enabled: function(){
						return get_theme() != "classic.css"
					},
					description: "使得窗口更像Windows 98.",
				},
				{
					item: "&现代 (WIP)",
					action: function(){
						set_theme("modern.css");
					},
					enabled: function(){
						return get_theme() != "modern.css"
					},
					description: "使得窗口像现在的Windows.",
				},
			]
		},
		{
			item: "&回到绿绿峰主页",
			// shortcut: "Ctrl+Shift+G",
			action: function(){
				window.location.href="../../../index.html"
			},
			description: "回到绿绿峰主页.",
		},
	],
};

var go_outside_frame = false;
if(frameElement){
	try{
		if(parent.$MenuBar){
			$MenuBar = parent.$MenuBar;
			go_outside_frame = true;
		}
	}catch(e){}
}
var $menu_bar = $MenuBar(menus);
if(go_outside_frame){
	$menu_bar.insertBefore(frameElement);
}else{
	$menu_bar.prependTo($V);
}

$menu_bar.on("info", function(e, info){
	$status_text.text(info);
});
$menu_bar.on("default-info", function(e){
	$status_text.default();
});

var $extras_menu_button = $menu_bar.get(0).ownerDocument.defaultView.$(".extras-menu-button");
try{
	// TODO: refactor shared key string
	if(localStorage["jspaint extras menu visible"] != "true"){
		$extras_menu_button.hide();
	}
}catch(e){}
