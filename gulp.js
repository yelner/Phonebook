var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function(){
   gulp.src('javascripts/*.js')
   .pipe(uglify);
});
