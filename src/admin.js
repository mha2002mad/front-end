import { createApp } from 'vue'
import adminView from './components/adminView/adminComp.vue';
import root from '../src/components/PageComp.vue';
import { Notifications } from '@kyvg/vue3-notification';

const app = createApp(root, {
    theView: adminView
})
app.use(Notifications);
app.mount('#app')