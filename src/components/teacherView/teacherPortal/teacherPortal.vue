<template>
    <pageGate :graphCaption="graphCaption" :API="API" :changeCurrentComponent="changeCurrentComponent" :theme="theme" :links="links"/>
</template>

<script setup>
import { defineProps } from 'vue';
import pageGate from '@/components/abstractiveComponents/pageGateAbstraction/pageGate.vue';
import markAttendance from '@/components/teacherView/markAttendance/markAttendance.vue';
import LR from '@/components/teacherView/leaveRequestManagement/LR.vue';
import AH from '@/components/teacherView/AttendanceHistory/AH.vue';

defineProps({
    theme: Number,
    changeCurrentComponent: Function,
    API: Function
});

const graphCaption = ['monthly precence', 'weekly precence'];


const links = {
    markAttendance: {
        name: "mark attendance",
        component: markAttendance,
    },
    leaveRequestManagement: {
        name: "leave Requests",
        component: LR,
    },
    AH: {
        name: "attend. history",
        component: AH,
    }
};



</script>

<style scoped></style>