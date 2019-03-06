var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    svgSprite = require('gulp-svg-sprite');


gulp.task('pug', function() {
  return gulp.src("src/*.pug", "!src/tpl/**/_*.pug")
      .pipe(pug())
      .pipe(gulp.dest("./build"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function(){ 
    return gulp.src('src/**/*.scss') 
        .pipe(sass()) 
        .pipe(gulp.dest('build/css')) 
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build/'
            },
        port: 8080,
        notify: false
        });
});    

gulp.task('svgSprite', function () {
    return gulp.src('src/images/icons/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('build/images/'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.source.fonts)
    .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('imagemin', function () {
  return gulp.src("./src/images")
    .pipe(imagemin({
      interlaced: true
      , progressive: true
      , optimizationLevel: 5
    }))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('watch', function () {
  gulp.watch("src/**/*.scss"), gulp.series['sass'];
  gulp.watch("src/*.html"), gulp.series['html'];
  gulp.watch("src/images/*"), gulp.series['img'];    
});

gulp.task('compress', function() {
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'));    
});

gulp.task('build', gulp.parallel[
  'styles', 
  'images',
  'components',
  'modules',
  'pages'

], function() {
    var buildFonts = gulp.src('src/fonts/**/*') 
    .pipe(gulp.dest('build/fonts'));
    
    });

