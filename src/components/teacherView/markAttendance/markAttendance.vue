<template v-if="render">
    <SL style="width: 75vw;" :theme="theme" :changeCurrentComponent="changeCurrentComponent" :backToComponent="teacherPortal" >
        <div class="colDevider">
            <div class="row">
                <form :class="`${props.theme ? 'optionsFormDark' : 'optionsFormWhite'}`">
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">course</p>
                        <select v-model="course" :id="`${theme ? 'selectDark' : 'selectWhite'}`" :disabled="inputDisabled">
                                <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" v-for="(item, index) in courseOptions" :key="index" :value="item.ID">{{ item.course__courseName }}</option>
                        </select>
                    </div>
                </form>
            </div>
                <template v-if="showTable">
                    <template v-if="[...students.valueOf()].length == 0">
                        <p :class="`${props.theme ? 'darkhint' : 'whitehint'}`">no students for particuar course</p>
                    </template>
                    <template v-else>
                        <div class="outerFrame">
                        <div class="captions">
                        <p :class="`${props.theme ? 'darkCaption' : 'whiteCaption'}`">student</p>
                        <p :class="`${props.theme ? 'darkCaption' : 'whiteCaption'}`">present</p>
                    </div>
                    <div id="frame">
                        <div :class="`${props.theme ? 'darkDataView' : 'whiteDataView'}`">
                            <div v-for="(item) in [...students.valueOf()]" :key="item.ID" :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                                <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ item.studentName }}</p>
                                <input class="checkBox" type="checkbox" :value="item.ID" @click="alterStudentForPost($event.target.checked, item.ID)">
                            </div>
                        </div>
                    </div>
                    <form id="placingTheButton" @submit.prevent="marchToServer">
                        <input :disabled="inputDisabled" :id="`${theme ? 'submitButtonDark': 'submitButtonWhite'}`" type="submit" value="submit">
                    </form>
                    </div>
                    </template>
            </template>
            <template v-else>
                <p :class="`${props.theme ? 'darkhint' : 'whitehint'}`">please select options</p>
            </template>
        </div>
    </SL>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';
import teacherPortal from '../teacherPortal/teacherPortal.vue';
import { notify } from '@kyvg/vue3-notification';

const props = defineProps({
    theme: Number,
    changeCurrentComponent: Function,
    backToComponent: Object,
    API: Function,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function
});

const render = ref(0)
const course = ref('');
const inputDisabled = ref(0)
const students = ref([])
const courseOptions = ref([])
const showTable = ref(0)
const studentsForPost = ref([])

onMounted(async () => {
    const res = await props.API.get('/pullTodayCourse').catch((err) => props.catchNetworkError(err));
    courseOptions.value = await res.data;
    if (courseOptions.value.length == 0) {
        notify({
            type: 'warn',
            text: "you've no lectures today to store attendance for"
        })
    }
    render.value = 1
});

async function pullStudents() {
    inputDisabled.value = 1;
    const res = await props.API.post('/pullStudentsForAttendanceInput', JSON.stringify({
        course: course.value
    }), {onUploadProgress: (e) => props.progressBarManagement(e)}).catch((err) => props.catchNetworkError(err))
    students.value = await res.data;
    students.value.sort((a, b) => a.studentName.localeCompare(b.studentName));
    [...students.value].forEach((student) => {
        studentsForPost.value.push({
            ID: student.ID,
            name: student.studentName,
            present: 0
        })
    })
    inputDisabled.value = 0
}

watch(course, async (nc) => {
    if (nc == '') {
        return ;
    }

    await pullStudents()
    showTable.value = 1
});

function alterStudentForPost(value, ID) {
    let obj = studentsForPost.value.find(element => element.ID == ID);
    if (value == false) {
        obj.present = false
    } else {
        obj.present = true
    }
}


async function marchToServer() {
    inputDisabled.value = 1;
    let filterNoAltering = studentsForPost.value.find(e => e.present == undefined)
    if (filterNoAltering) {
        notify({
            type: 'warn',
            text: `please provide presence status for ${filterNoAltering.name}`
        })
    }
    
    const c = courseOptions.value.find((c) => c.ID == course.value)
    const res = await props.API.post('/sendAttendance', JSON.stringify({
        data: studentsForPost.value,
        course: course.value,
        TTDID: c.TTDID,
        day: c.day,
    })).catch((err) => props.catchNetworkError(err))
    
    inputDisabled.value = 0;
    if(res.data['message'] == 'positive'){
        notify({
            type: 'success',
            text: 'sucessfully stored attendance'
        })
    }
}

</script>

<style src="./styles.css" scoped></style>