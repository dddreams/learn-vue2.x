/**
 * vue 配置文件
 * @type {{devServer: {proxy: {"/loginApi": {changeOrigin: boolean, pathRewrite: {"^/loginApi": string}, target: string}}, port: number, host: string, https: boolean, open: boolean}}}
 */
module.exports = {
    devServer: {
        host:'0.0.0.0',
        port: 8081,
        https: false,
        open: false,
        proxy: {
            '/loginApi': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/loginApi': ''
                }
            },
        }
    }
}