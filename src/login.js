import { createApp } from 'vue'
import LoginComp from './components/loginComp/LoginComp.vue'
import PageComp from './components/PageComp.vue'
import { Notifications } from '@kyvg/vue3-notification';

const app = createApp(PageComp, {
    theView: LoginComp
});
app.use(Notifications);
app.config.errorHandler = (e) => console.log(e);
app.mount('#app')
