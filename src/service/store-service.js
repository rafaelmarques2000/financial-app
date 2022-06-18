import {createStore} from "vuex"
import {VuexPersistence} from "vuex-persist"

export const store = createStore( {
     state: {
         auth: false,
         token: null,
         userData: null
     },
    mutations: {
         setAuthenticateTrue(state) {
              state.auth = true
         },

        setAuthenticateFalse(state) {
            state.auth = false
        },

        setAuthToken(state, token) {
             state.token = token
        },
        setUserData(state, userData) {
             state.userData = userData
        }
    },
    plugins:[new VuexPersistence({storage: window.localStorage}).plugin]
});

export const setAuthStates = (payload, response) => {
    store.commit("setAuthToken", payload.token)
    store.commit("setUserData", response.data)
    store.commit("setAuthenticateTrue")
}

export const revokeAuthState = () => {
    store.commit("setAuthToken", null)
    store.commit("setUserData", null)
    store.commit("setAuthenticateFalse")
}