// dependencies
const gulp = require('gulp')
const browserify = require('browserify')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserSync = require('browser-sync').create()

// browser support
const browsers = ['> 1%', 'last 2 versions', 'Firefox ESR', 'IE 10']

// paths
const assets = './assets/'

// building css
gulp.task('css', () => {
  let processors = [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: browsers,
      warnForDuplicates: false
    }),
    require('cssnano')()
  ]

  return gulp
    .src(assets + 'css/main.css')
    .pipe(postcss(processors))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(assets + 'bundle'))
    .pipe(browserSync.stream())
})

// building js
gulp.task('js', function() {
  return browserify({
    entries: assets + 'js/index.js'
  }).bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(assets + 'bundle'))
  .pipe(browserSync.stream())
});

// default task to run
gulp.task('default', ['js', 'css'])

// watching files
gulp.task('watch', () => {
  gulp.watch(assets + 'css/*.css', ['css'])
  gulp.watch(assets + 'js/*.js', ['js'])
})

gulp.task('serve', () => {
  browserSync.init({
    server: '.'
  })

  gulp.watch(assets + 'css/*.css', ['css'])
  gulp.watch(assets + 'js/*.js', ['js'])
  gulp.watch('./*.html').on('change', browserSync.reload)
})
