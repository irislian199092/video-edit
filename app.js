'use strict';
var express = require('express');
var bodyParser = require('body-parser');	  //请求解析插件
var nconf=require('nconf'); 								//配置插件
var winston = require('winston');						//打印插件
var errorhandler = require('errorhandler');	//错误处理插件

//Create express type of variable app
var app = express();

var configurations = module.exports;

//logging
var logger = new (winston.Logger)({ transports: [new (winston.transports.Console)({ colorize: true })] });

//locading setting.js
require('./setting')(app, configurations, express, logger, errorhandler);

// merge nconf overrides with the configuration file.
nconf.argv().env().file({ file: 'config.json' });

// Routes
require('./routes')(app);

logger.info('listening on', nconf.get('port'));

app.listen(process.env.PORT || nconf.get('port'))
