<template>
    <DCR v-if="render" :catchNetworkError="catchNetworkError" :progressBarManagement="progressBarManagement" :responseManagement="responseManagement" :API="API" :currentComponent="currentComponent" :changeCurrentComponent="changeCurrentComponent" :theme="theme"/>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import teacherPortal from './teacherPortal/teacherPortal.vue';
import DCR from '../abstractiveComponents/dynamicComponentRenderer/DCR.vue';

const props = defineProps({
    theme: Number,
    cookie: Object,
    LCSRF: Function,
    API: Function,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function
});

const render = ref(0);
const currentComponent = ref(teacherPortal);
const changeCurrentComponent = (component) => {
    currentComponent.value = component;
};

onMounted(async()=>{
    await props.LCSRF()
    await props.API.post('/authorise', {
        'role': 'T'
    }).then(async (r) => {
        if (r.data['message'] == 'negative') {
            window.location.href = '/login'
            return ;
        }
    }).catch((err) => {props.catchNetworkError(err); window.location.href = '/login'});
    render.value = 1
});

</script>