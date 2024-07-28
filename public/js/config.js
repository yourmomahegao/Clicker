// Default libraries
var $ = require("jquery");

// Version control libraries
var wget = require("wget");
const { resolve } = require("path");

// Application libraries
const os = require("os");
const fs = require("fs");
const { exec, spawn, spawnSync } = require("child_process");
const tmp = require("tmp");

const { report } = require("node:process");
const jsautogui = require("jsautogui");
const hotkeys = require("hotkeys-js");