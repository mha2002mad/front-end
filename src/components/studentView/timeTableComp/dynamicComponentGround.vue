<template>
    <keep-alive>
        <component :is="TimeTableComp" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :LRMD="LRMD" :SLRMD="SLRMD" :data="data" :API="API" :theme="theme" :changeCurrentComponent="changeCurrentComponent"/>
    </keep-alive>
</template>

<script setup>
import {defineProps} from 'vue';
import TimeTableComp from './timeTable/timeTableComp.vue';

defineProps({
    changeCurrentComponent: Function,
    theme: Number,
    API: Function,
    data: Object,
    LRMD: Object,
    SLRMD: Function,
    responseManagement: Function,
    progressBarManagement: Function
});


</script>