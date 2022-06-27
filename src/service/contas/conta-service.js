
import {checkStatusRequest, httpClient} from "@/service/http-client";
import {alert,toastAlert} from "@/service/alert-service";
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

    data.showLoading = true

    httpClient.request({
        method: data.account.id == null ? "POST" : "PUT",
        url: data.account.id == null ? `/users/${store.state.userData.id}/accounts` : `/users/${store.state.userData.id}/accounts/${data.account.id}`,
        data: {
            description: data.account.description,
            initial_amount: data.account.initial_amount,
            type: data.account.type.value
        }
    }).then(response => {
        toastAlert("success", "Operacão realizada com sucesso")
        data.showModal = false
        data.showLoading = false
        getAccounts(data)
    }).catch(error => {
        data.showLoading = false
        toastAlert("error", error.data.message)
    })
}

export const getAccounts = (data) => {
    data.showLoading = true
    httpClient.get(`/users/${store.state.userData.id}/accounts`)
        .then(response => {
             data.showLoading = false
             data.items = response.data
        }).catch(error => {
            data.showLoading = false
            toastAlert("error", error.data.message)
        })
}

export const deleteAccount = (data) => {
    data.showLoading = true
    httpClient.delete(`/users/${store.state.userData.id}/accounts/${data.account.id}`)
        .then(response => {
            toastAlert("success", "Conta deletada com sucesso")
            data.showDeleteModal = false
            data.showLoading = false
            getAccounts(data)
        }).catch(error => {
            data.showLoading = false
            toastAlert("error", error.data)
        })
}

export const addingSharingUser = (data) => {
    if(data.selectedUser === null) {
        toastAlert("error", "Selecione um usuário para compartilhar a conta")
        return
    }

    data.showLoading = true

    httpClient.post(`/users/${store.state.userData.id}/accounts/${data.account.id}/sharing`, {
        users: [data.selectedUser.value]
    }).then(response => {
        data.selectedUser = null
        data.showLoading = false
        toastAlert("success", "Conta compartilhada com sucesso")
        getAllSharingUserAccounts(data)
    }).catch( error => {
        data.showLoading = false
        toastAlert("error", error.response.data.message)
    })
}

export const getAllSharingUserAccounts = (data) => {
    httpClient.get(`/users/${store.state.userData.id}/accounts/${data.account.id}/sharing`).then(response => {
        data.sharingAccountUsers = response.data
    }).catch( error => {
        toastAlert("error", error.response.data.message)
    })
}

export const deleteUserAccountSharing = (data, userId) => {
    data.showLoading = true
    httpClient.delete(`/users/${store.state.userData.id}/accounts/${data.account.id}/sharing/${userId}`).then(response => {
        toastAlert("success", "Compartilhamento deletado com sucesso")
        data.showLoading = false
        getAllSharingUserAccounts(data)
    }).catch( error => {
        data.showLoading = false
        toastAlert("error", error.response.data.message)
    })
}