<template>
    <pageGate :API="API" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :graphCaption="graphCaption" :theme="theme" :links="links" :changeCurrentComponent="changeCurrentComponent"/>
</template>

<script setup>
import { defineProps } from 'vue';
import attendanceComp from '../attendanceComp/attendanceComp.vue';
import leaveRequestsComp from '../leaveRequestsComp/leaveRequestsComp.vue';
import dynamicComponentGround from '../timeTableComp/dynamicComponentGround.vue';
import pageGate from '@/components/abstractiveComponents/pageGateAbstraction/pageGate.vue';


defineProps({
    theme: Number,
    changeCurrentComponent: Function,
    responseManagement: Function,
    progressBarManagement: Function,
    API: Function
});


const links = {
    attendanceComp : {
        name: "Attendance Record",
        component: attendanceComp
    },
    leaveRequests : {
        name: "leave Requests",
        component: leaveRequestsComp
    },
    timeTable : {
        name: "time Table",
        component: dynamicComponentGround
    },
}

const graphCaption = ['monthly precence', 'weekly precence'];

</script>


<style src="./styles.css" scoped></style>