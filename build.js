//加载模块
const gulp = require("gulp");
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const imagemin = require('gulp-imagemin');

const utils = require("./utils/index");

//加载路径函数
let {
    scripts : scriptsJSON,
    scss : scssJSON
} = require("./conf/index")

let [scriptsTaskArr,scssTaskArr] = [];

//初始化函数
function init(){
    scriptsTaskArr = utils.selectScripts(scriptsJSON,"scripts-build-","dist");
    scssTaskArr = utils.selectScss(scssJSON,"scss-build-","dist");
}

init();


//创建指令
gulp.task("html-build",()=>{
    gulp.src("./src/*.html")
        .pipe(gulp.dest("./dist"))
});

gulp.task("scss-build",scssTaskArr)

gulp.task("scripts-build",scriptsTaskArr)

gulp.task("images-build",()=>{
    gulp.src("./src/images/*.+(png|jpg|jpeg|gif)")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/images"))
})

gulp.task("gulp-build",["html-build","scss-build","scripts-build","images-build",])

