import axios from "axios";
import {revokeAuthState, store} from "@/service/store-service"
import { useRouter } from "vue-router";

let config = {
        baseURL:"http://localhost:8086/api/v1"
}

let router = useRouter();

if(store.state.token != null) {
    config.headers = {Authorization: `Bearer ${store.state.token}`};
}

export const httpClient = axios.create(config);
export const httpClientLogin = axios.create({
    baseURL:"http://localhost:8086/api/v1"
})

export const checkStatusRequest = (error) => {
     if(error.response.status === 401) {
         revokeAuthState()

     }
}