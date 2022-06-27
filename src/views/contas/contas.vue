<template>
   <div class="contas-page">
      <h1 class="display-3">Contas</h1>

     <va-card class="page-content flex">
         <h1 class="filter-title">Filtros</h1>
         <va-input label="Descrição" class=""></va-input>
     </va-card>

      <va-card class="page-content">
          <va-card-content>
                <va-button @click="openCreateOrUpdateModal(data)" gradient class="mr-4"><i class="fas fa-plus"></i>  Adicionar contas</va-button>

            <div class="va-table-responsive" style="margin-top: 15px; width: 100%">
                <div class="table-container">
                 <table class="va-table va-table--striped" style="width: 100%">
                        <thead>
                        <tr>
                          <th>Descrição</th>
                          <th>Valor inicial</th>
                          <th>Tipo</th>
                          <th>Proprietário</th>
                          <th>Criado em</th>
                          <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                             <tr v-for="item in data.items">
                                 <td>{{item.description}}</td>
                                 <td>{{formatMoney((item.initial_amount /100), "BRL")}}</td>
                                 <td><va-badge :text="formatTagText(item.type)" :color="formatTagColor(item.type)" text-color="#fff" class="mr-4" /></td>
                                 <td>{{item.owner ? "Sim":"Não"}}</td>
                                 <td>{{new Date(item.created_at).toLocaleString()}}</td>
                                 <td>
                                    <va-button :disabled="!item.owner" @click="openCreateOrUpdateModal(data,item, item.id)" flat :rounded="false" class="mr-4"><i class="fas fa-edit"></i> </va-button>
                                    <va-button :disabled="!item.owner" flat :rounded="false" @click="openDeleteModal(data,item, $refs.modaldelete)" class="mr-4" color="#dd2c2c"><i class="fas fa-trash"></i> </va-button>
                                    <va-button :disabled="!item.owner" flat :rounded="false" @click="openSharedModal(data,item,$refs.modalshare)" class="mr-4" color="#000"><i class="fas fa-share"></i> </va-button>
                                 </td>
                             </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
          </va-card-content>
      </va-card>

     <va-modal ref="modalaccount"  :hide-default-actions="true" @close="clearModal(data)" ok-text="Finalizar" size="large" :title="data.modalTitle" v-model="data.showModal">
         <va-alert color="danger" v-if="data.alertVisible" class="mb-4">
           {{data.alertMsg}}
         </va-alert>
         <div class="row">
           <div class="flex md6">
             <div class="item" style="margin-right: 10px">
                <va-input v-model="data.account.description" type="text" label="Descrição"></va-input>
             </div>
           </div>
           <div class="flex md6">
             <div class="item"><va-input v-model="data.account.initial_amount" type="text" label="Valor inicial"></va-input></div>
           </div>

           <div class="flex md12" style="margin-top: 10px">
             <div class="item">
               <va-select v-model="data.account.type" label="Tipos de conta" :options="data.accountTypesOptions"> </va-select>
             </div>
           </div>

         </div>
       <template #footer>
           <va-button color="secondary" @click="$refs.modalaccount.hide()" style="margin-right: 10px"><i class="fas fa-times" style="margin-right: 10px"></i> Cancelar </va-button>
           <va-button color="primary" @click="createOrUpdateAccount(data)"><i class="fas fa-save" style="margin-right: 10px"></i> Salvar </va-button>
       </template>
     </va-modal>

     <va-modal ref="modaldelete" :hide-default-actions="true" title="Confirmação de exclusão" size="large" @close="clearModal(data)" v-model="data.showDeleteModal">
       {{data.confirmDeleteMessage}}
       <template #footer>
         <va-button color="secondary" @click="$refs.modaldelete.hide()" style="margin-right: 10px"><i class="fas fa-times" style="margin-right: 10px"></i> Cancelar </va-button>
         <va-button color="primary" @click="deleteAccount(data)"><i class="fas fa-save" style="margin-right: 10px"></i> Confirmar </va-button>
       </template>
     </va-modal>

     <va-modal ref="modalshare" @close="clearModal(data)" :hide-default-actions="true" title="Compartilhar conta" size="large" v-model="data.showSharedModal">
       <p style="margin-bottom: 15px;">Escolha abaixo com quais usuários deseja compartilhar sua conta</p>
       <div class="share-search" style="display: flex">
         <va-select
             class="mb-12 margin-15px"
             label="Usuários"
             :options="data.usersList"
             v-model="data.selectedUser"
             searchable
         />
         <va-button class="mb-3" @click="addingSharingUser(data)"><i class="fas fa-plus margin-15px"></i> Adicionar</va-button>
       </div>
     <div class="table-shared-content" style="height: 250px; overflow: auto">
       <table class="va-table va-table--striped" style="width: 100%">
           <tr>
              <th>Nome</th>
              <th>Ações</th>
           </tr>
           <tr v-for="user in data.sharingAccountUsers">
               <td>{{user.view_name}}</td>
               <td><va-button flat color="#dd2c2c" @click="deleteUserAccountSharing(data, user.user_id)"><i class="fas fa-trash"></i> </va-button></td>
           </tr>
       </table>
     </div>

       <template #footer>
         <va-button color="secondary" @click="$refs.modalshare.hide()" style="margin-right: 10px"><i class="fas fa-times" style="margin-right: 10px"></i> Cancelar </va-button>
       </template>
     </va-modal>

   </div>

  <loading :show="data.showLoading"></loading>

</template>

<script>
import {reactive,onMounted} from "vue";
import {openCreateOrUpdateModal, clearModal, openDeleteModal, openSharedModal} from "@/service/contas/modal-service";
import {
  addingSharingUser,
  createOrUpdateAccount,
  deleteAccount,
  deleteUserAccountSharing,
  getAccounts
} from "@/service/contas/conta-service";
import {formatTagColor, formatTagText, getAccountTypesOptions} from "@/service/contas/conta-util";
import {getAllUsers} from "@/service/users/user-service";
import Loading from "@/components/loading";
import {formatMoney} from "@/service/utils";

export default {
  name: "contas",
  components: {Loading},
  setup() {

    const data = reactive({
          account: {
              id: null,
              description: null,
              initial_amount: null,
              type: null
          },
         items: [],
       showModal: false,
       modalTitle: "Criar nova conta",
       alertMsg: null,
       alertVisible: false,
       showDeleteModal: false,
       confirmDeleteMessage: null,
       showSharedModal: false,
       usersList: [],
       selectedUser:null,
       showLoading:false,
       sharingAccountUsers: [],
       accountTypesOptions: getAccountTypesOptions()
     })

    onMounted(() => {
        getAllUsers(data);
        getAccounts(data);
    })

    return {
        data,
        openCreateOrUpdateModal,
        clearModal,
        openDeleteModal,
        openSharedModal,
        createOrUpdateAccount,
        deleteAccount,
        formatTagText,
        formatTagColor,
        getAllUsers,
        addingSharingUser,
        deleteUserAccountSharing,
        formatMoney
    }
  }
}
</script>

<style scoped>

</style>