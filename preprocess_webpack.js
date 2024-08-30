const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public','js', 'app.js'); 

fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  const result = data.replace('var chunkLoadingGlobal = global["webpackChunkbilliardssolyluna"] = global["webpackChunkbilliardssolyluna"] || [];', 'var chunkLoadingGlobal = window["webpackChunkbilliardssolyluna"] = window["webpackChunkbilliardssolyluna"] || [];');

  fs.writeFile(filePath, result, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log('global replaced with window in the bundle');
  });
});
