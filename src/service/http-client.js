import axios from "axios";
import {revokeAuthState, store} from "@/service/store-service"
import router from "@/router";

let config = {
        baseURL:"http://localhost:8086/api/v1"
}

if(store.state.token != null) {
    config.headers = {Authorization: `Bearer ${store.state.token}`};
}

const client = axios.create(config);

client.interceptors.response.use((response) => {
  return response
}, (error) => {
   if(error.response.status === 401) {
        revokeAuthState()
        return router.push({path:"/"})
   }
   return Promise.reject(error)
})

export const httpClient = client

export const httpClientLogin = axios.create({
    baseURL:"http://localhost:8086/api/v1"
})
