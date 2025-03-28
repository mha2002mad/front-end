<template>
    <SL :theme="theme" :backToComponent="timeTableComp">
        <form :id="`${theme ? 'formDark' : 'formWhite'}`" @submit.prevent="sumbitLeaveRequest">
            <p :id="`${theme ? 'captionDark' : 'captionWhite'}`">submit your leave request </p>
        <textarea v-model="reason" :class="`${theme ? 'inputDark' : 'inputWhite'}`" placeholder="write your reason here" type="text" required></textarea>
        <input :id="`${theme ? 'submitButtonDark': 'submitButtonWhite'}`" type="submit" value="Submit">
        </form>
    </SL>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';
import timeTableComp from '../timeTable/timeTableComp.vue';
import { notify } from '@kyvg/vue3-notification';


const props = defineProps({
    API: Function,
    theme: Object,
    LRMD: Object,
    responseManagement: Function,
    progressBarManagement: Function
})



const reason = ref('')
const sumbitLeaveRequest = () => {
    if(/^[0-9A-Za-z\s]+$/.test(reason.value)){
        props.API.post('storeLeaveRequest', JSON.stringify({
            lectureName: props.LRMD.lectureName,
            forDate: props.LRMD.date,
            reason: reason.value
        }), {onUploadProgress: (e) => props.progressBarManagement(e)}).then((r) => {
            props.responseManagement(r, 'leave request')
        })
    } else {
        notify({
            type: 'warn',
            title: 'inaccurate input in reason'
        })
    }
};

</script>

<style src="./styles.css" scoped></style>