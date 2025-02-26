/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const workboxBuild = require('workbox-build');

// Clean "build" directory
const clean = () => {
  return del(['build/*'], {dot: true});
};
gulp.task('clean', clean);

// Copy "src" directory to "build" directory
const copy = () => {
 return gulp.src(['src/**/*']).pipe(gulp.dest('build'));
};
gulp.task('copy', copy);

// TODO - create a task to build the service worker
const buildSw = () => {
  return workboxBuild.injectManifest({
    swSrc: 'src/sw.js',
    swDest: 'build/sw.js',
    globDirectory: 'build',
    globPatterns: [
      '**\/*.css',
      'index.html',
      'js\/animation.js',
      'images\/home\/*.jpg',
      'images\/icon\/*.svg',
      'pages/offline.html',
      'pages/404.html'
    ]
  }).then(resources => {
    console.log(`Injected ${resources.count} resources for precaching, totaling ${resources.size} bytes.`);
  }).catch(err => {
    console.log('Uh oh...', err);
  });
};
gulp.task('build-sw', buildSw);

// This is the app's build process
const build = gulp.series('clean', 'copy', 'build-sw');
gulp.task('build', build);

// Build the app, run a local dev server, and rebuild on "src" file changes
const browserSyncOptions = {
  server: 'build',
  port: 8081,
  open: false
};
const serve = gulp.series(build, () => {
  browserSync.init(browserSyncOptions);
  return gulp.watch('src/**/*', build).on('change', browserSync.reload);
});
gulp.task('serve', serve);

// Set the default task to "build"
gulp.task('default', build);
