// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
// 检查脚本
gulp.task('lint', function() {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./dist/js'));
});

// 编译less
gulp.task('less', function() {
    gulp.src('style/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/style'));
});
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        //.pipe(htmlmin(options))
        .pipe(gulp.dest('./dist'));
});
// 合并，压缩文件

gulp.task('jsmin', function () {
    gulp.src('script/*.js') //多个文件以数组形式传入
        //.pipe(uglify())
        //这句让js不正常
        .pipe(gulp.dest('dist/script'));
});

gulp.task('testImagemin', function () {
    gulp.src('images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('./dist/style'));
});
// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'less', 'jsmin','testHtmlmin','testCssmin','testImagemin');

    // 监听文件变化
    gulp.watch('script/*.js', function(){
        gulp.run('lint', 'less', 'jsmin','testHtmlmin','testCssmin','testImagemin');
    });
});