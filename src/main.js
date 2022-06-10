import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'vuestic-ui/dist/vuestic-ui.css'
import {VuesticPlugin} from "vuestic-ui"
import {store} from "@/service/storeservice";

const app = createApp(App);

app.use(VuesticPlugin)
    .use(store)
    .use(router)
    .mount('#app')
