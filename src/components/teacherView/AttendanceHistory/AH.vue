<template v-if="render">
    <SL style="width: 75vw;" :theme="theme" :changeCurrentComponent="changeCurrentComponent" :backToComponent="teacherPortal" >
        <div class="colDevider">
            <div :class="`${props.theme ? 'darkCol' : 'whiteCol'}`">
                <form :class="`${props.theme ? 'optionsFormDark' : 'optionsFormWhite'}`">
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">from</p>
                        <input :key="index" :class="`${props.theme ? 'darkDate' : 'whiteDate'}`" type="date" v-model="fromDate" :disabled="inputDisabled">
                    </div>
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">to</p>
                        <input :class="`${props.theme ? 'darkDate' : 'whiteDate'}`" type="date" v-model="toDate" :disabled="inputDisabled">
                    </div>
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">course</p>
                        <select v-model="course" :id="`${theme ? 'selectDark' : 'selectWhite'}`" :disabled="inputDisabled">
                            <option  :class="`${theme ? 'optionDark' : 'optionWhite'}`" v-for="(item, index) in courseOptions" :key="index" :value="item.ID">{{ item.name }}</option>
                        </select>
                    </div>
                </form>
            </div>
                <template v-if="showTable">
                    <template v-if="[...data.valueOf()].length == 0">
                        <p :class="`${props.theme ? 'darkhint' : 'whitehint'}`">no records yet</p>
                    </template>
                    <template v-else>
                        <div class="outerFrame">
                        <div class="captions">
                        <p :class="`${props.theme ? 'darkCaption' : 'whiteCaption'}`">student</p>
                        <p :class="`${props.theme ? 'darkCaption' : 'whiteCaption'}`">date</p>
                        <p :class="`${props.theme ? 'darkCaption' : 'whiteCaption'}`">reason</p>
                    </div>
                    <div id="frame">
                        <div :class="`${props.theme ? 'darkDataView' : 'whiteDataView'}`">
                            <div v-for="(item, index) in [...data.valueOf()]" :key="index" :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                                <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ item.studentName }}</p>
                                <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ item.date }}</p>
                                <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ item.reason }}</p>
                            </div>
                        </div>
                    </div>
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
const fromDate = ref('')
const toDate = ref('')
const course = ref('');
const inputDisabled = ref(0)
const data = ref([])
const courseOptions = ref([])
const showTable = ref(0)


onMounted(async () => {
    const res = await props.API.get('/pullAvailableCourses');
    courseOptions.value = await res.data;
    console.log(courseOptions.value);
    render.value = 1
});

async function pullRecords() {
    inputDisabled.value = 1;
    const res = await props.API.post('/pullRecords', JSON.stringify({
        fromDate: fromDate.value,
        toDate: toDate.value,
        course: course.value
    }), {onUploadProgress: (e) => props.progressBarManagement(e)})
    data.value = await res.data
    console.log(data.value);
    inputDisabled.value = 0
}

watch([course, fromDate, toDate], async ([nc, nfd, ntd]) => {
    if (nc == '' || nfd == '' || ntd == '') {
        return ;
    }

    if (fromDate.value >= toDate.value) {
        notify({
            type: 'warn',
            title: 'inefficient dates',
            text: 'starting date can\'t be after or at ending date',
            ignoreDuplicates: true
        })
        return ;
    }

    pullRecords()
    showTable.value = 1
});


</script>

<style src="./styles.css" scoped></style>