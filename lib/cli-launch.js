#!/usr/bin/env node
"use strict";

var _cli = require("./cli.js");

var _index = require("./index.js");

// const args = process.argv;
// const [,, ...args] = process.argv
const route = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
(0, _cli.mdLinksCli)(route, option1, option2).then(result => console.log(result)).catch(err => console.log(err));