let gulp = require('gulp');
// let sass = require('gulp-sass');
let uglify = require('gulp-uglify');  // 压缩js
// let babel = require('gulp-babel');
let changed = require('gulp-changed');
let htmlmin = require('gulp-htmlmin');
let debug = require('gulp-debug');


const plugins = require('gulp-load-plugins');  // 整合gulp的各个插件

let htmlminOptions = {    // html常用的压缩方法
    removeComments: true,  // 清除html注释
    collapseWhitespace: true,  // 压缩html
    collapseBooleanAttributes: true,  // 省略布尔属性的值
    removeEmptyAttributes: true,  // 删除所有空格作为属性值
    removeScriptTypeAttributes: true, // 删除type=text/javascript
    removeStyleLinkTypeAttributes: true,  // 删除type=text/css
    minifyJS: true,  // 压缩页面js
    minifyCSS: true  // 压缩页面css
};

gulp.task('copy-jslib', function () {
    return gulp.src('src/js/*')
        .pipe(uglify())
        .pipe(debug({ title: '【js-app编译】：'}))
        .pipe(gulp.dest('src2/js/'));
});

gulp.task('copy', function () {
    gulp.start('copy-jslib')
})


gulp.task('iframehtml', function () {
    let srcHtml = 'src/iframe/*.html';
    let destHtml = 'src2/iframe/';
    return gulp
        .src(srcHtml)
        .pipe(changed(destHtml, {extension: '.html' }))
        .pipe(debug({ title: '【iframehtml编译】: ' }))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(destHtml));
})

gulp.task('html', function () {
    gulp.start('iframehtml')
})

// gulp.task('one', function (cb) {  // cb为任务函数提供的回调，用来通知任务已经完成
//     setTimeout(function () {
//         console.log('one is done')
//         cb();  // 执行回调，表示这个异步任务已经完成
//     }, 5000)
// })

// // 这时two任务会在one任务中的异步操作完成之后再执行
// gulp.task ('two', ['one'], function () {
//     console.log('two is done');
// })


gulp.task('default', function () {
    gulp.start('copy', 'html')
})