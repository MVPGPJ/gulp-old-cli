//模块加载
const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

//const proxy = require("http-proxy-middleware");

const utils = require("./utils/index");

let {
    scripts : scriptsJSON,
    scss : scssJSON,
    proxy : proxyList,
} = require("./conf/index")

//定义存储指令的数组
let [scriptsTaskArr,scssTaskArr] = [];


//定义方法
function init(){
    scriptsTaskArr = utils.selectScripts(scriptsJSON,"scripts-dev-","dev");
    scssTaskArr = utils.selectScss(scssJSON,"scss-dev-","dev");
}
init();

//指令创建
/** 
 * @task  connect         配置测试服务器
 * @task  html-dev        转移html文件
 * @task  scripts-dev         合并压缩转移js文件 
 * @task  watch-dev       监听html scss js images的改变
 * @task  gulp-dev        实现html scss js images connect的合并编译转移
*/ 

gulp.task("connect",()=>{
    connect.server({
        root: 'dev',
        livereload: true,
        middleware: function (connect, opt) {
            return utils.goProxy(proxyList);
        }
    });
});

gulp.task("html-dev",()=>{
    return gulp.src(["./src/*.html"])
        .pipe(gulp.dest("./dev"))
        .pipe(connect.reload());
});

gulp.task("images-dev",()=>{
    return gulp.src(["./src/images/*.+(jpg|gif|png|jpeg)"])
               .pipe(gulp.dest("./dev/images"))
               .pipe(connect.reload());
});

gulp.task("scss-dev",scssTaskArr);
gulp.task("scripts-dev",scriptsTaskArr);

gulp.task("watch-dev",()=>{
    gulp.watch("./src/*.html",["html-dev"]);
    gulp.watch("./src/images/*.+(jpg|gif|png|jpeg)",["images-dev"]);
    utils.watchScripts(scriptsJSON,"scripts-dev-");
    utils.watchScss(scssJSON,"scss-dev-");
});

gulp.task("gulp-dev",["html-dev","scss-dev","scripts-dev","images-dev","connect","watch-dev"]);

require("./build");