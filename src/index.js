"use strict";
const fs = require("fs");
const {
  promisify
} = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const plugins = [
  [
    "imagemin-gifsicle",
    {
      interlaced: true
    }
  ],
  [
    "imagemin-jpegtran",
    {
      progressive: true
    }
  ],
  [
    "@dinamomx/imagemin-optipng",
    {
      optimizationLevel: 5
    }
  ],
  [
    "imagemin-svgo",
    {
      plugins: [{
        removeViewBox: false
      }]
    }
  ]
].map(([name, opts]) => require(name)(opts));

export const minifyFile = filename => [...plugins, it => writeFile(filename, it)].reduce(
  (acc, it) => acc.then(it),
  readFile(filename)
);
