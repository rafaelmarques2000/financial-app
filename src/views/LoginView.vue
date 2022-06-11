<template>
   <div class="login-background">
      <div class="login-form-content">
           <va-card class="flex md12" style="padding:45px">
                <h1 class="login-title display-4">Sistema de controle de finanças</h1>
                 <va-alert color="danger" v-if="data.alertVisible" class="mb-4">
                   {{data.alertMsg}}
                 </va-alert>
                <va-input label="Usuário" bordered v-model="data.login" class="login-inputs"></va-input>
                <va-input type="password" bordered v-model="data.senha" label="Senha de acesso" class="login-inputs"></va-input>
                <va-button @click="authenticate" :rounded="false" class="mr-4" style="margin-top: 15px;background: #DF2D62">Entrar</va-button>
           </va-card>
           <p class="copyright">Sistemas de finanças todos os direitos reservados &copy; 2022</p>
      </div>
   </div>
</template>

<script>
import {reactive} from "vue";
import {alert} from "@/service/alert-service";
import {httpClient} from "@/service/http-client";
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {setAuthStates, revokeAuthState} from "@/service/store-service"

export default {
  name: "Login",
  setup(){
    const data = reactive({
         login: null,
         senha: null,
         alertMsg: null,
         alertVisible: false
     })

    const store = useStore()
    const router = useRouter();

     const authenticate = () => {

         if(data.login == null) {
             alert(data, "Preencha o campo login")
             return
         }

         if(data.senha == null) {
           alert(data, "Preencha o campo senha")
           return
         }

         httpClient.post("/auth", {
             username:data.login,
             password: data.senha
         }).then(response => {
           let payload = response.data
             httpClient.get(`/users/${payload.userId}`,{
                 headers:{"Authorization": `Bearer ${payload.token}`}
             }).then(response => {
                setAuthStates(store, payload, response)
                router.push({path:"/app"})
             }).catch(error => {
                alert(data,error.response.data.message)
                revokeAuthState(store)
             })

         }).catch(error => {
             console.log('erro');
             alert(data,error.response.data.message)
             revokeAuthState(store)
         })
     }
    return {
       data,
       authenticate
    }
  }
}
</script>

<style scoped>
  .login-background {
    background: #154470;
    width: 100%;
    height: 100vh;
  }

  .login-form-content {
    width: 500px;
    position: absolute;
    margin: auto;
    top: 30%;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .login-inputs {
    margin-bottom: 15px;
    height: 40px;
  }

  .login-title {
    text-align: center;
    margin-bottom: 22px;
  }

  .copyright {
     color: #fff;
     margin-top: 15px;
    text-align: center;
  }

</style>