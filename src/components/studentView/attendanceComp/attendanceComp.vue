<template>
    <SL :theme="theme" :backToComponent="studentPortal" :changeCurrentComponent="changeCurrentComponent">
        <p id="info">this data demonstrates classes which you were absent</p>
        <dataViewerComponents :flag="'AH'" :theme="theme" :API="API"/>
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

<style src="./styles.css" scoped>

</style>