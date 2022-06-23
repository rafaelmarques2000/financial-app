import axios from "axios";
import {store} from "@/service/store-service"

let config = {
        baseURL:"http://ec2-3-238-163-4.compute-1.amazonaws.com/api/v1"
}

if(store.state.token != null) {
    config.headers = {Authorization: `Bearer ${store.state.token}`};
}

export const httpClient = axios.create(config)
export const httpClientLogin = axios.create({
    baseURL:"http://ec2-3-238-163-4.compute-1.amazonaws.com/api/v1"
})