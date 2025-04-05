<template>
    <SL :theme="theme" :changeCurrentComponent="changeCurrentComponent" :backToComponent="TeacherPortal">
        <SLD :theme="theme" :API="API" :progressBarManagement="progressBarManagement" :responseManagement="responseManagement" :catchNetworkError="catchNetworkError" />
    </SL>
</template>

<script setup>
import { defineProps } from 'vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';
import TeacherPortal from '../teacherPortal/teacherPortal.vue';
import SLD from '@/components/abstractiveComponents/leaveRequestDashboard/LRD.vue';

defineProps({
    theme: Number,
    changeCurrentComponent: Function,
    API: Function,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function
});


</script>

<style src="./styles.css" scoped></style>