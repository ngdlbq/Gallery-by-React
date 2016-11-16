var express = require('express');
var path = require('path');
var ejs = require('ejs');
var webpack = require('webpack');
var webpackConfig = require('./app/webpack.config');

//var middleware = require('webpack-dev-middleware');

var compile = webpack(webpackConfig);

var app = express();

// 设置视图的路径以及模板引擎
app.set('views','./des');
app.set('view engine','html');
app.engine('html',ejs.renderFile);    // 注册html 模板引擎,并调用 ejs 进行渲染


// 配置静态资源
app.use(express.static('./des'))

//app.use(middleware(compile))

// 设置 路由规则
app.use('/',function(req,res){
	res.render('index');
})


// 设置监听的端口号
app.listen(8080,function(){
	console.log('正在监听8080端口...');
})