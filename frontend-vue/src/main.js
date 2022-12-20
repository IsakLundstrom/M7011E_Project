import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupInterceptors from './services/setupInterceptors'
import VueSocialSharing from 'vue-social-sharing'
import vue3GoogleLogin from 'vue3-google-login'

import googleAPI from './secrets/google.json'

setupInterceptors(store)

console.log(googleAPI, "googleAPI")

createApp(App)
    .use(router)
    .use(store)
    .use(VueSocialSharing)
    .use(vue3GoogleLogin, {
        clientId: googleAPI.clientID,
    })
    .mount('#app')
