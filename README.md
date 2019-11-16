# pc端脚手架

#### 项目介绍

>  基于gulp构建的前端工程化




#### 软件架构

>   使用gulp进行工程化构建
>
>   node
>

#### 项目使用

```javascript

 1. git clone https://gitee.com/zhengkaixuan/nike-cn.git (https)  或
   git clone git@gitee.com:zhengkaixuan/nike-cn.git  (SSH)

   到本地仓库

 2. npm install            添加依赖，初始化

 3. ./conf/index.js        进行js、scss等路径配置

 4. npm start              开启开发模式dev，查看效果

 5. npm run build          开发完成打包上线，上线版本

```



#### 项目结构

### 以项目首页，购物车，界面展示为示例进行展示构建

```javescript

--| conf
    --| index.js                       ;文件路径和代理等配置文件
--| dist                               ;压缩上线版本
--| dev
--| src
        --| images                     ;静态图片资源文件
        --| scripts
            --| display
                --| display.js         ;商品显示界面
            --| index
                --| index.js           ;主页
            --| shoppingCart
                --| shoppingCart.js    ;购物车 
            --| libs
                --| commont.js         ;公共函数
            --| modules                ;公共组件和引用库存放区
                --| jquery.js
        --| scss
            --| commont                ;公共样式存放区
                --| reset.scss         ;全局初始化样式
            --| dispaly   
                --| display.scss       ;商品显示样式表
            --| index
                --| index.scss         ;首页样式表
            --| shoppingCart
                --| shoppingCart.scss  ;购物车样式表
        --| index.html                 ;首页
        --| display.html               ;商品显示界面   
        --| shoppingCart.html          ;购物车
            
```

