import { createApp } from 'vue'
import studentView from './components/studentView/mainView.vue'
import root from './components/PageComp.vue'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(root, {
    theView: studentView
})

app.use(Notifications); 
app.mount('#app')
