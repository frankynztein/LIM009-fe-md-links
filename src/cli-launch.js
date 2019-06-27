#!/usr/bin/env node
import { mdLinksCli } from "./cli.js";

const route = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4]


mdLinksCli(route, option1, option2).then(result =>console.log (result))
.catch(err => console.log(err))