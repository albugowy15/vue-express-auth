import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';
import { domain, clientId, audience } from './../auth_config.json'
import './../node_modules/bulma/css/bulma.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(
    createAuth0({
        domain: domain,
        client_id: clientId,
        redirect_uri: window.location.origin,
        audience: audience,
    })
);
app.use(createPinia())
app.use(router)

app.mount('#app')
