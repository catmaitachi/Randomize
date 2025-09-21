const { src, dest } = require('gulp');
const fs = require('fs');
const path = require('path');

function ensureDistDir(cb) {

  const distPath = path.join(__dirname, 'dist');

  if (!fs.existsSync(distPath)) {

    fs.mkdirSync(distPath, { recursive: true });

  }

  cb();

}

function copyAssets() {

  return src('nodes/**/*.svg').pipe(dest('dist/'));

}

exports.build = require('gulp').series(ensureDistDir, copyAssets);