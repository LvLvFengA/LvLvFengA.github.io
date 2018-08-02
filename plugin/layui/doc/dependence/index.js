/**
*自定义配置的配置文件
*/

//001.全局配置文件
layui.config({
	// dir: '/res/layui/'	//layui.js 所在路径，一般在页面引用，除非特殊，这里可以忽视
	// ,version: false		//更新模块缓存,设为true即让浏览器不缓存
	// ,debug: false 		//用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
	// ,base: '' 			//设定扩展的Layui模块的所在目录，一般用于外部模块扩展
});

//002.定义模块，里面写上模块名
layui.define(['layer', 'form'], function(exports){
  var layer = layui.layer
  ,form = layui.form;
  
  layer.msg('自定义模块启动');
  
  exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
}); 