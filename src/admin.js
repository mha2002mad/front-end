import { createApp } from 'vue'
import adminComp from './components/adminView/adminComp.vue';
import PageComp from './components/PageComp.vue';
import { Notifications } from '@kyvg/vue3-notification';

const app = createApp(PageComp, {
    theView: adminComp
})
app.use(Notifications);
app.config.errorHandler = (e)  => console.log(e)
app.mount('#app')