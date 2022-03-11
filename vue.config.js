/*
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:22:59
 * @LastEditTime: 2022-03-10 16:23:02
 * @FilePath: \npmtest\vue.config.js
 */

module.exports = {
    pages:{
        index:{
            entry:"src/main.js",
            template:"publlic/index.html",
            filename:"index.html"
        }
    },
    // 扩展webpackage配置 使packages加入编译
    chainWebpack: config => {
        config.module
        .rule('js')
        .include
            .add('/packages/')
            .end()
        .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })

    }
}