import {useStore} from "vuex";
import {httpClient} from "@/service/http-client";
import {alert} from "@/service/alert-service";
const store = useStore();

export const createAccount = (data) => {
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
}

export const deleteAccount = (data) => {

}