<template>
    <DCR v-if="render" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :LRMD="leaveRequestMetaData" :SLRMD="setLeaveRequestMetaData" :API="props.API" :currentComponent="curComp" :changeCurrentComponent="changeCurrentComponent" :theme="theme"/>
</template>

<script setup>
import { onMounted, defineProps, ref } from 'vue';
import studentPortal from './studentPortal/studentPortal.vue';
import DCR from '../abstractiveComponents/dynamicComponentRenderer/DCR.vue';

const props = defineProps({
    theme: Number,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function,
    API: Function,
    cookie: Object,
    LCSRF: Function
});




const render = ref(0)
onMounted(async()=>{
    await props.LCSRF();
    await props.API.post('/authorise', {
        'role': 'S'
    }).then(async (r) => {
        if (r.data['message'] == 'negative') {
            window.location.href = '/login'
            return ;
        }
    }).catch((err) => {props.catchNetworkError(err); window.location.href = '/login'});
    render.value = 1
})

let curComp = ref(studentPortal);
const changeCurrentComponent = (component) => {
    curComp.value = component;
};
const leaveRequestMetaData = ref({})
function setLeaveRequestMetaData(data) {
    leaveRequestMetaData.value = data
}



</script>

<style src="./styles.css" scoped></style>