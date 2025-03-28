<template>
    <div :id="`${themetracer ? 'dashboardDark' : 'dashboardWhite'}`">
        <div :style="`display=${showNavBar ? 'block' : 'none'}`" :id="`${themetracer ? 'navBarDark' : 'navBarWhite'}`">
            <div>students</div>
            
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
defineProps(['themetracer']);

const showNavBar = ref(1);
// function toggleNavBar() {
//     if (showNavBar.value) {
//         showNavBar.value = 0;
//         return ;
//     }
//     showNavBar.value = 1;
// }
</script>

<style src="./styles.css"></style>