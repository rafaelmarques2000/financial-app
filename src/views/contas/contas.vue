<template>
   <div class="contas-page">
      <h1 class="display-3">Contas</h1>
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
                          <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                             <tr v-for="item in data.items">
                                 <td>{{item.description}}</td>
                                 <td>R$ {{item.initial_value}}</td>
                                 <td><va-badge :text="item.type" color="warning" class="mr-4" /></td>
                                 <td>
                                    <va-button @click="openCreateOrUpdateModal(data,item, item.id)" flat :rounded="false" class="mr-4"><i class="fas fa-edit"></i> </va-button>
                                    <va-button flat :rounded="false" @click="openDeleteModal(data,item, $refs.modaldelete)" class="mr-4" color="#dd2c2c"><i class="fas fa-trash"></i> </va-button>
                                    <va-button flat :rounded="false" @click="openSharedModal(data,item,$refs.modalshare)" class="mr-4" color="#000"><i class="fas fa-share"></i> </va-button>
                                 </td>
                             </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
          </va-card-content>
      </va-card>

     <va-modal ref="modalaccount" cancel-text="Cancelar" :hide-default-actions="true" @close="clearModal(data)" ok-text="Finalizar" size="large" :title="data.modalTitle" v-model="data.showModal">
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
           <va-button color="primary" @click="createAccount(data)"><i class="fas fa-save" style="margin-right: 10px"></i> Salvar </va-button>
       </template>
     </va-modal>

     <va-modal ref="modaldelete" :hide-default-actions="true" title="Confirmação de exclusão" size="large" v-model="data.showDeleteModal">
       {{data.confirmDeleteMessage}}
       <template #footer>
         <va-button color="secondary" @click="$refs.modaldelete.hide()" style="margin-right: 10px"><i class="fas fa-times" style="margin-right: 10px"></i> Cancelar </va-button>
         <va-button color="primary" @click="createAccount(data)"><i class="fas fa-save" style="margin-right: 10px"></i> Confirmar </va-button>
       </template>
     </va-modal>

     <va-modal ref="modalshare" :hide-default-actions="true" title="Compartilhar conta" size="large" v-model="data.showSharedModal">
       <p>Escolha abaixo com quais usuários deseja compartilhar sua conta</p>
       <template #footer>
         <va-button color="secondary" @click="$refs.modalshare.hide()" style="margin-right: 10px"><i class="fas fa-times" style="margin-right: 10px"></i> Cancelar </va-button>
         <va-button color="primary" @click="createAccount(data)"><i class="fas fa-save" style="margin-right: 10px"></i> Confirmar </va-button>
       </template>
     </va-modal>

   </div>
</template>

<script>
import {reactive} from "vue";
import {openCreateOrUpdateModal, clearModal, openDeleteModal, openSharedModal} from "@/service/contas/modal-service";
import {createAccount} from "@/service/contas/conta-service";
export default {
  name: "contas",
  setup() {
     const data = reactive({
          account: {
              id: null,
              description: null,
              initial_amount: null,
              type: null
          },
         items: [
             {
                id: 1,
                description: "Conta teste",
                initial_value: 5000,
                type: "DINHEIRO"
             },
             {
               id: 2,
               description: "Conta teste",
               initial_value: 5000,
               type: "CARTAO_CREDITO"
             }
         ],
       showModal: false,
       modalTitle: "Criar nova conta",

       alertMsg: null,
       alertVisible: false,

       showDeleteModal: false,
       confirmDeleteMessage: null,

       showSharedModal: false,

       accountTypesOptions: [
         {
           text: 'Cartão de credito',
           value: 'CARTAO_CREDITO'
         },
         {
           text: 'Dinheiro',
           value: 'DINHEIRO'
         }
       ]
     })

    return {
        data,
        openCreateOrUpdateModal,
        clearModal,
        openDeleteModal,
        openSharedModal,
        createAccount
    }
  }
}
</script>

<style scoped>

</style>