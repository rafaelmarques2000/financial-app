<template>
     <div class="app-content">
          <div class="sidebar" :class="{'sidebar-hidden':data.closeSidebar}">

             <div class="sidebar-title">
                  <h1>Sistema de controle de finanças</h1>
             </div>

            <div class="sidebar-avatar">
                <va-avatar style="margin-right: 10px" src="https://randomuser.me/api/portraits/women/5.jpg" />
                <b style="color: #fff">{{data.viewUserName}}</b>
            </div>

            <div class="sidebar-menu">
                <ul>
                  <li><router-link to="/app"><i class="fas fa-home"></i> Home</router-link></li>
                  <li><router-link to="/app/contas"><i class="fas fa-money-check-dollar"></i> Contas</router-link></li>
                  <li><router-link to="/app/servicos"><i class="fa-solid fa-bell-concierge"></i> Serviços</router-link></li>
                  <li><router-link to="/app/transacoes"><i class="fas fa-sack-dollar"></i> Transações</router-link></li>
                </ul>
            </div>


          </div>
          <div class="app-main-content">
              <div class="navbar-system">
                    <div class="left-navbar">
                        <button type="button" @click="closeSidebar" class="menu-button"><i class="fa-solid fa-bars"></i></button>
                    </div>

                    <div class="right-navbar">
                     <div class="dropdown-content">
                        <va-button-dropdown flat class="ml-2">
                          <template #label>
                            <va-avatar style="margin-right: 10px" src="https://randomuser.me/api/portraits/women/5.jpg" />
                          </template>
                          <ul>
                            <li><a href="" @click.prevent="logout"><i class="fas fa-sign-out"></i> Sair</a></li>
                          </ul>
                        </va-button-dropdown>
                     </div>
                    </div>
              </div>

             <div class="content">
                  <router-view></router-view>
             </div>
          </div>
     </div>
</template>

<script>
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {revokeAuthState} from "@/service/store-service";
import {useStore} from "vuex";
export default {
  name: "HomeView",
  setup() {
    const store = useStore();
    const data = reactive({
       closeSidebar: false,
       viewUserName: store.state.userData.view_name
    });

    const router = useRouter();

    const closeSidebar = () => {
        if(!data.closeSidebar) {
           data.closeSidebar = true;
           return;
        }
        data.closeSidebar = false;
     }

     const logout = () => {
         revokeAuthState()
         router.push({path:"/"})
     }

     return {
        data,
        closeSidebar,
        logout
     }
  }
}
</script>

<style scoped>

     .app-content {
         display: flex;
         width: 100%;
     }

     .app-main-content {
       width: 100%;
     }

     .content {
       width: 100%;
       padding: 21px;
     }

     .sidebar {
       display: inline-block;
       vertical-align: top;
       height: 100vh;
       width: 300px;
       overflow: auto;
       background: #113054;
       transition: margin-left .5s;
     }

     .sidebar-hidden {
        margin-left: -300px;
     }

     .sidebar-title {
       text-align: center;
       font-size: 20px;
       color: #fff;
       margin-top: 33px;
     }

     .sidebar-avatar {
       padding: 15px;
       background: #1b4770;
       margin-top: 23px;
       margin-bottom: 25px;
     }

     .sidebar-menu {
        margin: 0 auto;
        padding: 0px;
     }

     .sidebar ul li{
        margin-bottom: 0;
        display: block;
        padding: 0px;
     }

     .sidebar ul li a:link, .sidebar ul li a:active, .sidebar ul li a:visited{
        color: #fff;
        font-weight: 400;
        transition: background-color .5s;
        display: block;
        width: 100%;
        padding: 14px;
     }

     .sidebar ul li a:hover {
        background: #DF2D62;
        color: #fff;
     }

     .dropdown-content {
        position: relative;
        top:10px;
        right: 30px;
     }

    .navbar-system {
       display: flex;
       background: #154470;
       width: 100%;
       height: 70px;
       justify-content: space-between;
    }

    .menu-button {
      padding: 10px;
      position: relative;
      top: 10px;
      left: 10px;
      font-size: 20px;
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
    }
</style>