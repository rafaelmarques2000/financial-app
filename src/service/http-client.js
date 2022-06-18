import axios from "axios";
import {store} from "@/service/store-service"

let config = {
        baseURL:"http://localhost:8085/api/v1"
}

if(store.state.token != null) {
    config.headers = {Authorization: `Bearer ${store.state.token}`};
}

export const httpClient = axios.create(config)
export const httpClientLogin = axios.create({
    baseURL:"http://localhost:8085/api/v1"
})