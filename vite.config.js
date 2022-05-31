import vue from '@vitejs/plugin-vue'

const path = require('path')
export default {
    base: '',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 8088,
        // cors: true, //默认启用并允许任何源
        https: false,
        // open: true, //在服务器启动时自动在浏览器中打开应用程序
        // 反向代理配置，注意rewrite写法
        proxy: {
            '/api': {
                // target: "http://103.239.247.51:26911/",
                // target: 'http://dx.s1.hiold.net:26911/', //代理接口
                // target: 'http://localhost:26911/', //代理接口
                // target:'http://43.248.185.238:11431/',
                target:'http://bd103.top:42431/',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/apis/, '')
            }
        }
    }
}
