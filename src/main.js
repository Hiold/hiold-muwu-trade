import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import mitt from 'mitt'

const app = createApp(App);

installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app');

//注册事件总线
const $bus = {}
const emitter = mitt()
$bus.on = emitter.on
$bus.emit = emitter.emit
$bus.off = emitter.off
app.config.globalProperties.$bus = $bus;
app.config.globalProperties.$currentUser = null;

