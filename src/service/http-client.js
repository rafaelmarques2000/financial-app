import axios from "axios";
import {revokeAuthState, store} from "@/service/store-service"
import router from "@/router";

let config = {
        baseURL:"http://localhost:8086/api/v1"
}

if(store.state.token != null) {
    config.headers = {Authorization: `Bearer ${store.state.token}`};
}

export const httpClient = axios.create(config);

export const httpClientLogin = axios.create({
    baseURL:"http://localhost:8086/api/v1"
})
