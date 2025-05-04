<template>
    <component :catchNetworkError="catchNetworkError" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :API="props.API" :is="currentComponent" :changeCurrentComponent="changeCurrentComponent" :theme="theme"></component>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue';
import AuthoriseAdmin from './components/adminAuth/AuthoriseAdmin.vue';
// import AdminPortal from './components/adminPortal/adminPortal.vue';

const props = defineProps({
    theme: Number,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function,
    API: Function,
    cookie: Object,
    LCSRF: Function
});

const currentComponent = ref(AuthoriseAdmin)
const changeCurrentComponent = (component) => {
  currentComponent.value = component
};

onMounted(async () => {
  await props.LCSRF()
});

console.log(props.cookie.getAll());


onBeforeUnmount(async ()=>{
  
});

</script>

<style src="./styles.css" scoped></style>