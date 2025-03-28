<template v-if="render">
    <SL style="width: 75vw;" :theme="theme" :changeCurrentComponent="changeCurrentComponent" :backToComponent="teacherPortal" >
        <div class="colDevider">
            <div :class="`${props.theme ? 'darkCol' : 'whiteCol'}`">
                <form :class="`${props.theme ? 'optionsFormDark' : 'optionsFormWhite'}`">
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">from</p>
                        <input :class="`${props.theme ? 'darkDate' : 'whiteDate'}`" type="date" v-model="fromDate" id="">
                    </div>
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">to</p>
                        <input :class="`${props.theme ? 'darkDate' : 'whiteDate'}`" type="date" v-model="toDate" id="">
                    </div>
                    <div>
                        <p :class="`${props.theme ? 'darkData' : 'whiteData'}`">course</p>
                        <select v-model="course" :id="`${theme ? 'selectDark' : 'selectWhite'}`"  required>
                            <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" value="none" hidden selected disabled>select the course</option>
                            <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" value="student">student</option>
                            <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" value="teacher" >teacher</option>
                        </select>
                    </div>
                </form>
            </div>
            <div id="frame">
                <div class="captions">
                    <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">student</p>
                    <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">reason</p>
                </div>
                <div :class="`${props.theme ? 'darkDataView' : 'whiteDataView'}`">
                        <div :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                            <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ data.student }}</p>
                            <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ data.reason }}</p>
                        </div>
                        <div :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                            <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ data.student }}</p>
                            <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ data.reason }}</p>
                        </div>
                        <div :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                            <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ data.student }}</p>
                            <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ data.reason }}</p>
                        </div>
                        <div :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                            <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ data.student }}</p>
                            <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ data.reason }}</p>
                        </div>
                        <div :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                            <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ data.student }}</p>
                            <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ data.reason }}</p>
                        </div>
                        <div :class="`${props.theme ? 'darkDataRows' : 'whiteDataRows'}`">
                            <p :class="`${props.theme ? 'studentNameDark' : 'studentNameWhite'}`">{{ data.student }}</p>
                            <p :class="`${props.theme ? 'theReasonDark' : 'theReasonWhite'}`">{{ data.reason }}</p>
                        </div>
                </div>
            </div>
        </div>
    </SL>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';
import teacherPortal from '../teacherPortal/teacherPortal.vue';

const props = defineProps({
    theme: Number,
    changeCurrentComponent: Function,
    backToComponent: Object,
    API: Function
});
const render = ref(0)
const fromDate = ref('')
const toDate = ref('')
const course = ref('');

const data = {
    student: 'aaaaaaaaa aaaaaaaaa',
    reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitconsectetur adipiscing elit. Maecenas ac ligula vel tortor porttitor accumsan vel nec ex. Nunc nisl justo, auctor nec tincidunt viverra, auctor vel eros. Donec sit amet augue ligula. Aliquam dapibus et leo nec varius. Mauris in odio ut erat viverra aliquet. Fusce nec lectus at neque imperdiet tempus.'
}

onMounted(() => {
    render.value = 1
});


</script>

<style src="./styles.css" scoped></style>