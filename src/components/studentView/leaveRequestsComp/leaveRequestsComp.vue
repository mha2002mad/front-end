<template>
    <SL :changeCurrentComponent="changeCurrentComponent" :backToComponent="studentPortal" :theme="theme">
        <dataViewerComponents :flag="'LR'" :API="API" :theme="theme"/>
    </SL>
</template>

<script setup>
import { defineProps } from 'vue';
import studentPortal from '../studentPortal/studentPortal.vue';
import dataViewerComponents from '../../abstractiveComponents/dataVFstudent/dataViewerComponents.vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';

defineProps({
    changeCurrentComponent: Function,
    theme: Number,
    API: Function
});


</script>

<style src="./styles.css" scoped></style>