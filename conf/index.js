module.exports = {
    scripts : {
        "index" : {
            url : "./src/scripts/index/"
        },
        "display" : {
            url : "./src/scripts/display/"
        },
        "shoppingCart" : {
            url : "./src/scripts/shoppingCart/"
        }
    },
    scss : {
        "index" : {
            url : "./src/scss/index/"
        },
        "display" : {
            url : "./src/scss/display/"
        },
        "shoppingCart" : {
            url : "./src/scss/shoppingCart/"
        }
    },

    //服务器代理配置
    proxy : {
        "/pxx" : {
            url : "https://apiv2.pinduoduo.com/api/fiora/subject/goods/"
        },
        "/dt" : {
            url : "https://www.duitang.com/napi/blog/list/by_filter_id/"
        }
    }
}