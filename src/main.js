import Vue from 'vue'
import App from './components/IndexMainContainer'
import './assets/style/index.css'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
