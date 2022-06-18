import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'vuestic-ui/dist/vuestic-ui.css'
import {VuesticPlugin} from "vuestic-ui"
import {store} from "@/service/store-service";
import "@/assets/app.css"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';


const app = createApp(App);

app.use(VuesticPlugin)
    .use(store)
    .use(router)
    .use(VueToast ,{position: "top"})
    .mount('#app')

export default app