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

const app = createApp(App);

app.use(VuesticPlugin)
    .use(store)
    .use(router)
    .mount('#app')
