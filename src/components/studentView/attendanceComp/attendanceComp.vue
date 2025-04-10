<template>
    <SL :theme="theme" :backToComponent="studentPortal" :changeCurrentComponent="changeCurrentComponent">
        <dataViewerComponents :catchNetworkError="catchNetworkError" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :flag="'AH'" :theme="theme" :API="API"/>
    </SL>
</template>

<script setup>
import { defineProps } from 'vue';
import studentPortal from '../studentPortal/studentPortal.vue';
import dataViewerComponents from '@/components/abstractiveComponents/dataVFstudent/dataViewerComponents.vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';

defineProps({
    changeCurrentComponent: Function,
    theme: Number,
    API: Function,
    responseManagement: Function,
    progressBarManagement: Function,
    catchNetworkError: Function
});

</script>

<style src="./styles.css" scoped>

</style>