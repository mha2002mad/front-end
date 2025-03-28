<template>
    <SL :theme="theme" :backToComponent="TeacherPortal" :changeCurrentComponent="changeCurrentComponent"/>
</template>

<script setup>
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';
import TeacherPortal from '../teacherPortal/teacherPortal.vue';

</script>