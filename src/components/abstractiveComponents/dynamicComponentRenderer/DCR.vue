<template>
    <component :catchNetworkError="catchNetworkError" :is="currentComponent" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :LRMD="LRMD" :SLRMD="SLRMD" :API="props.API" :theme="theme" :changeCurrentComponent="changeCurrentComponent"></component>
</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    theme: Number,
    currentComponent: Object,
    changeCurrentComponent: Function,
    data: Object,
    API: Function,
    SLRMD: Function,
    LRMD: Object,
    responseManagement: Function,
    progressBarManagement: Function,
    catchNetworkError: Function
});

</script>

<style src="./styles.css" scoped></style>