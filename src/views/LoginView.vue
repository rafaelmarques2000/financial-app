<template>

   <div class="login-background">
      <div class="login-form-content">
           <va-card class="flex md12 login-content" style="padding:45px">
              <div class="login-form">
                <h1 class="login-title display-4">Sistema de controle de finanças</h1>
                 <va-alert color="danger" v-if="data.alertVisible" class="mb-4">
                   {{data.alertMsg}}
                 </va-alert>
                <va-input label="Usuário" bordered v-model="data.login" class="login-inputs"></va-input>
                <va-input type="password" bordered v-model="data.senha" label="Senha de acesso" class="login-inputs"></va-input>
                <va-button @click="authenticate" :rounded="false" class="mr-4" style="margin-top: 15px;background: #DF2D62">Entrar</va-button>
              </div>

           </va-card>

      </div>
   </div>

</template>

<script>
import {reactive} from "vue";
import {alert} from "@/service/alert-service";
import {httpClientLogin} from "@/service/http-client";
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

         httpClientLogin.post("/auth", {
             username:data.login,
             password: data.senha
         }).then(authResponse => {
             httpClientLogin.get(`/users/${authResponse.data.userId}`,{
                 headers:{"Authorization": `Bearer ${authResponse.data.token}`}
             }).then(getUserResponse => {
                setAuthStates(authResponse, getUserResponse)
                router.push({path:"/app"})
             }).catch(error => {
                console.log(error)
                alert(data,error.response.data.message)
                revokeAuthState()
             })

         }).catch(error => {
             alert(data,error.response.data.message)
             revokeAuthState()
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
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .login-content {
    height: 100vh;
    border-radius: 0;
  }

  .login-inputs {
    margin-bottom: 15px;
    height: 40px;
  }

  .login-title {
    text-align: left;
    margin-bottom: 52px;
  }

  .login-form {
    position: relative;
    top: 30%;
  }

  .copyright {
    color: #999;
    position: relative;
    top: 164px;
    text-align: left;
  }

</style>