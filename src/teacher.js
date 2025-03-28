import { createApp } from 'vue'
import root from './components/PageComp.vue'
import TeacherView from './components/teacherView/teacherView.vue'
import { Notifications } from '@kyvg/vue3-notification'

const app = createApp(root, {
    theView: TeacherView
})
app.use(Notifications);
app.mount('#app')
