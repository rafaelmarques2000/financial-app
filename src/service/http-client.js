import axios from "axios";

export const httpClient = axios.create({
        baseURL:"http://localhost:8085/api/v1"
})