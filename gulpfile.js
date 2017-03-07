var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var runSequence = require('run-sequence');
var imagemin = require('gulp-imagemin');

/**
 * Compile and minify SCSS
 */
gulp.task('sass', function() {
  return gulp.src('app/Resources/public/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('web/css'));
});

/**
 * Concat and minify JS
 */
gulp.task('concat', function() {
  return gulp.src('app/Resources/public/js/*js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('web/js'));
});

/**
 * Move Mustache templates into web directory.
 */
gulp.task('mustache-tpl', function() {
  return gulp.src('app/Resources/public/js/templates/**/*.mst')
    .pipe(gulp.dest('web/js/templates'));
});

/**
 * Generate sprite and css file from PNGs
 */
gulp.task('sprites', function() {

  var options = {
    cssName: '_sprites.scss',
    cssFormat: 'scss',
    cssOpts: {
      cssClass: function(item) {
        // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
        if (item.name.indexOf('-hover') !== -1) {
          return '.icon-' + item.name.replace('-hover', ':hover');
          // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
        } else {
          return '.icon-' + item.name;
        }
      }
    },
    imgName: 'sprite.png',
    imgPath: '../images/design/sprite.png' // Imgpath par rapport au fichier css minifié
  };

  var spriteData = gulp.src('app/Resources/public/images/sprites/**/*.png')
    .pipe(spritesmith(options));

  spriteData.img
    .pipe(gulp.dest('web/images'));

  spriteData.css
    .pipe(gulp.dest('app/Resources/public/scss'));

});

/**
 * Simply move images to web directory (which is not versioned).
 */
gulp.task('images', function() {
  gulp.src('app/Resources/public/images/*.{jpg,jpeg,png,gif,svg}')
    .pipe(gulp.dest('web/images'));

  runSequence('imagemin');
});

/**
 * Compress images.
 */
gulp.task('imagemin', function() {
  gulp.src('web/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('web/images'));
});

/**
 * Watch task.
 */
gulp.task('watch', function() {
  runSequence('build');
  gulp.watch('app/Resources/public/scss/**/*scss', ['sass']);
  gulp.watch('app/Resources/public/js/*js', ['concat']);
  gulp.watch('app/Resources/public/images/sprites/**/*.png', ['sprites']);
  gulp.watch('app/Resources/public/images/*', ['images']);
  gulp.watch('app/Resources/public/js/templates/**/*mst', ['mustache-tpl']);
});


/**
 * Build all assets.
 */
gulp.task('build', function() {
  runSequence('sass', 'concat', 'mustache-tpl', 'sprites', 'images', 'imagemin');
});