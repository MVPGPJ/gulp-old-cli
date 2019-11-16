//模块加载
const gulp = require("gulp");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const sass = require('gulp-sass');
sass.compiler = require('node-sass'); 
const uglify = require("gulp-uglify");
const cleanCSS = require('gulp-clean-css');
const babel = require("gulp-babel");
const proxy = require("http-proxy-middleware");



//功能函数
//每个界面的js文件的指令绑定和合并转移
function selectScripts(json,type="scripts-dev-",mode="dev"){
    let scriptsTaskArr = [];
    for(let attr in json){
        scriptsTaskArr.push(type + attr);
        if(mode === "dev"){
            transferDevScripts(json,type,mode,attr);
        }else{
            transferDistScripts(json,type,mode,attr);
        }
    }
    return scriptsTaskArr;
}

//devScripts指令的添加
function transferDevScripts(json,type,mode,attr){
    gulp.task(type + attr,()=>{
        return gulp.src(json[attr].url + "*.js")
            .pipe(concat(attr + ".js"))
            .pipe(gulp.dest(`./${mode}/scripts`))
            .pipe(connect.reload())
    })
}
//distScripts指令的添加
function transferDistScripts(json,type,mode,attr){
        gulp.task(type + attr,()=>{
            return gulp.src(json[attr].url+"*.js")
                .pipe(concat(attr + ".js"))
                .pipe(babel({
                    presets: ['@babel/env'],
                }))
                .pipe(uglify())
                .pipe(gulp.dest(`./${mode}/scripts`))
        })
}


//dev和dist执行的判断
function selectScss(json,type="scss-dev-",mode="dev"){
    let scssTaskArr = []
    for(let attr in json){
        scssTaskArr.push(type + attr);
        if(mode === "dev"){
            transferDevScss(json,type,mode,attr);
        }else{
            transferDistScss(json,type,mode,attr);
        }   
    }
    return scssTaskArr;
}

//
function transferDevScss(json,type,mode,attr){
    gulp.task(type + attr,()=>{
        return gulp.src(["./src/scss/commont/reset.scss",json[attr].url + "*.+(scss|sass)"])
            .pipe(concat(attr + ".scss"))
            .pipe(sass())
            .pipe(gulp.dest(`./${mode}/stylesheets`))
            .pipe(connect.reload())
    })
}
//dScss指令的添加
function transferDistScss(json,type,mode,attr){
        gulp.task(type + attr,()=>{
            return gulp.src(["./src/scss/commont/reset.scss",json[attr].url+"*.+(scss|sass)"])
                .pipe(concat(attr + ".scss"))
                .pipe(sass())
                .pipe(cleanCSS({debug: true}, (details) => {
                    console.log(`${details.name}: ${details.stats.originalSize}`);
                    console.log(`${details.name}: ${details.stats.minifiedSize}`);
                  }))
                .pipe(gulp.dest(`./${mode}/stylesheets`))
        })
}

//每个界面的js文件watch的绑定
function watchScripts(json,mode){
    for(let attr in json){
        gulp.watch(json[attr].url + "*.js",[mode + attr])
    }
}
//每个界面的scss文件watch的绑定
function watchScss(json,mode){
    for(let attr in json){
        gulp.watch(json[attr].url + "*.scss",[mode + attr])
    }
}

//服务器代理
function goProxy(proxyList){
    let result = [];
    for(let attr in proxyList){
        let options = {
            target : proxyList[attr].url,
            changeOrigin : true ,
            pathRewrite : !proxyList[attr].rewrite ? {
                  ["^"+attr] : ""
            } : {}
      };
      result.push( proxy( attr , options) )
    }
    return result;
}

module.exports = {
    selectScripts,
    selectScss,
    watchScripts,
    watchScss,
    goProxy,
}