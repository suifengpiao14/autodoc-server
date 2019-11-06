#!/usr/bin/env node

'use strict';

/*
 * apidoc-swagger
 *
 * Copyright (c) 2015 Exact
 * Author Bahman Fakhr Sabahi <bahman.sabahi@exact.com>
 * Licensed under the MIT license.
 */

var path   = require('path');
var program = require('commander');
var server = require('../src/index');


    program
        .option("-h,--mongodb <input>",'mongodb host',"mongodb://127.0.0.1:27017/openapi")
        .option("-p,--port <number>","listen on port ",3000);

    program.parse(process.argv);

    

var options = {
    mongodb: program.mongodb,
    port: program.port
};
console.log(options)
server.app.start(options)
