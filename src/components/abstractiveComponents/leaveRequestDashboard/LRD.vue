<template>
    <template v-if="render">
        <template v-if="([...LR.valueOf()].length == 0)">
            <p :class="`${props.theme ? 'darkNoReq': 'whiteNoReq'}`">there is no leave requests yet</p>
        </template>
        <template v-else>
            <div :id="`${theme ? 'darkStuLeaveReqView' : 'whiteStuLeaveReqView'}`">
            <div v-for="(item, index) in [...LR.valueOf()]" :key="index" :class="`${theme ? 'darkStuLeaveReqRow' : 'whiteStuLeaveReqRow'}`">
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">{{ item.student }}</p>
                <p :class="`${theme ? 'darkStuLaveReqres' : 'whiteStuLaveReqres'}`">{{ item.reason }}</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">{{ item.course }}</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">{{ item.date }}</p>
                <template v-if="(item.statusI == 'approved')">
                    <p class="approvedLabel">approved</p>
                </template>
                <template v-else-if="(item.statusI == 'rejected')">
                    <p class="rejectedLabel">rejected</p>
                </template>
                <template v-else>
                    <form :id="`${theme ? 'darkLeaveReqButtons' : 'whiteLeaveReqButtons'}`" @submit.prevent="(e) => marchToServer(e.submitter.value, item)">
                    <input :disabled="disabled" :class="`${theme ? 'darkAcceptButton' : 'whiteAcceptButton'}`" type="submit" value="accept">
                    <input :disabled="disabled" :class="`${theme ? 'darkRejectButton' : 'whiteRejectButton'}`" type="submit" value="reject">
                </form>
                </template>
            </div>
        </div>
        </template>
    </template>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    theme: Number,
    API:Function,
    progressBarManagement: Function,
    responseManagement:Function,
    catchNetworkError: Function
});

const disabled = ref(0)
const render = ref(0);
const LR = ref([])
onMounted(async () => {
    const res = await props.API.get('/pullLeaveRequestsT').catch((err) => props.catchNetworkError(err));
    LR.value = res.data;
    render.value = 1
});

async function marchToServer(event, item){
    console.log(item);
    disabled.value = 1
    if (event == 'reject') {
        props.API.post('/teacherRespondToLeaveReq', JSON.stringify({
                course: item.IDC,
                status: 0,
                date: item.date,
                student: item.IDS
            }), {
                onUploadProgress: e => props.progressBarManagement(e)
            }).catch((err) => props.catchNetworkError(err))
        } else {
        props.API.post('/teacherRespondToLeaveReq', JSON.stringify({
                course: item.IDC,
                status: 1,
                date: item.date,
                student: item.IDS
            }), {
                onUploadProgress: e => props.progressBarManagement(e)
            }).catch((err) => props.catchNetworkError(err))
    }
    const res = await props.API.get('/pullLeaveRequestsT', {
                onUploadProgress: e => props.progressBarManagement(e)
            }).catch((err) => props.catchNetworkError(err));
    LR.value = res.data;
    disabled.value = 0
}

</script>

<style src="./styles.css" scoped></style>