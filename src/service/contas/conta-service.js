
import {httpClient} from "@/service/http-client";
import {alert} from "@/service/alert-service";
import {store} from "@/service/store-service";

export const createOrUpdateAccount = (data) => {
   if(data.account.description === null) {
       alert(data, "Preencha o campo descrição");
       return;
   }

    if(data.account.initial_amount === null) {
        alert(data, "Preencha o campo valor inicial");
        return;
    }

    if(data.account.type === null) {
        alert(data, "Preencha o campo tipo");
        return;
    }

    httpClient.request({
        method: data.account.id == null ? "POST" : "PUT",
        url: data.account.id == null ? `/users/${store.state.userData.id}/accounts` : `/users/${store.state.userData.id}/accounts/${data.account.id}`,
        data: {
            description: data.account.description,
            initial_amount: data.account.initial_amount,
            type: data.account.type.value
        }
    }).then(response => {
        window.alert(response.data.message)
        data.showModal = false
        getAccounts(data)
    }).catch(error => {
        window.alert(error.data.message)
    })
}

export const getAccounts = (data) => {
    httpClient.get(`/users/${store.state.userData.id}/accounts`)
        .then(response => {
             data.items = response.data;
        }).catch(error => {
            window.alert(error.data.message)
        })
}

export const deleteAccount = (data) => {
    httpClient.delete(`/users/${store.state.userData.id}/accounts/${data.account.id}`)
        .then(response => {
            window.alert("Conta deletada com sucesso")
            data.showDeleteModal = false
            getAccounts(data)
        }).catch(error => {
            window.alert(error.data.message)
        })
}
