import {httpClient} from "@/service/http-client";
import {toastAlert} from "@/service/alert-service";

export const getAllUsers = (data) => {
    httpClient.get("/users").then(result => {
         data.usersList = result.data.map(item => {
             return {text:item.view_name, value:item.id}
         })
    }).catch(error => {
        toastAlert("error", "Falha ao obter usuários")
    })
}