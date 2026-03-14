import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './style.css'
// 1. Import the router we created
import router from './router' 

const app = createApp(App)

// 2. TELL Vue to use the router! (This is what fixes your error)
app.use(router) 

app.mount('#app')