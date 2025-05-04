<template v-if="render">
    <template v-if="props.flag == 'LR'">
        <div v-if="(((typeof(data.valueOf())) != 'string'))" :id="`${theme ? 'darkRecordView' : 'whiteRecordView'}`">
                <div :class="`${theme ? 'darkRecord' : 'whiteRecord'}`">
                    <p v-for="(item) in [...columns.valueOf()]" :key="item" style="font-weight: bolder;" :class="`${theme ? 'darkData' : 'whiteData'}`">{{ item }}</p>
                </div>
                <div v-for="(item, index) in [...data.valueOf()]" :key="index" :class="`${theme ? 'darkRecord' : 'whiteRecord'}`">
                    <template v-if="(typeof(item) == 'object')">
                        <p v-for="(inneritem) in Object.keys(item).reverse()" :key="inneritem" :class="`${theme ? 'darkData' : 'whiteData'}`">{{ item[inneritem] }}</p>
                    </template>
                    <template v-else>
                        <p :key="inneritem" :class="`${theme ? 'darkData' : 'whiteData'}`">{{item}}</p>
                    </template>
                </div>
            </div>
        <div v-else>
                <p :id="`${theme ? 'darkNoDataView' : 'whiteNoDataView'}`">{{ data.valueOf() }}</p>
            </div>
        </template>
        <template v-else>
        <div class="theRow">
            <div class="tableColumn">
                <div v-for="(item, index) in tableData.valueOf()" :key="index" :class="`${props.theme ? 'darkCon' : 'whiteCon'}`">
                    <p :class="`${props.theme ? 'darkE' : 'whiteE'}`">{{ Object.keys(item)[0] }}</p>
                    <p :class="`${props.theme ? 'darkE' : 'whiteE'}`">{{ item[Object.keys(item)[0]] }}</p>
                </div>
            </div>
            <form :class="`${props.theme ? 'darkFormLayout' : 'whiteFormLayout'}`" @submit.prevent="">
                <select v-model="course" :class="`${props.theme ? 'darkSelect' : 'whiteSelect'}`">
                    <option :class="`${props.theme ? 'optionDark' : 'optionWhite'}`" selected disabled hidden value="a">select the course</option>
                    <option v-for="(item) in [...courses.valueOf()]" :key="item.ID" :class="`${props.theme ? 'optionDark' : 'optionWhite'}`" :value="item.ID">{{ item.courseName }}</option>
                </select>
            </form>
            <template v-if="(((typeof(data.valueOf())) != 'string'))">
                <template v-if="[...data.valueOf()].length == 0">
                    <div :id="`${theme ? 'darkNoDataView' : 'whiteNoDataView'}`">no records yet</div>
                </template>
                <template v-else>
                    <div :class="`${theme ? 'darkDateView' : 'whiteDateView'}`">
                    <div :class="`${theme ? 'darkRecord' : 'whiteRecord'}`">
                        <p v-for="(item) in [...columns.valueOf()]" :key="item" style="font-weight: bolder;" :class="`${theme ? 'darkData' : 'whiteData'}`">{{ item }}</p>
                    </div>
                    <div v-for="(item, index) in [...data.valueOf()]" :key="index" :class="`${theme ? 'darkRecord' : 'whiteRecord'}`">
                        <template v-if="(typeof(item) == 'object')">
                            <p v-for="(inneritem) in Object.keys(item).reverse()" :key="inneritem" :class="`${theme ? 'darkData' : 'whiteData'}`">{{ item[inneritem] }}</p>
                        </template>
                        <template v-else>
                            <p :key="inneritem" :class="`${theme ? 'darkData' : 'whiteData'}`">{{item}}</p>
                        </template>
                    </div>
                </div>
                </template>
            </template>
            <template v-else>
                <p :id="`${theme ? 'darkNoRecords' : 'whiteNoRecords'}`">{{ data.valueOf() }}</p>
            </template>
        </div>
    </template>
</template>


<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps({
    theme: Number,
    API: Function,
    flag: String,
    responseManagement: Function,
    progressBarManagement: Function,
    catchNetworkError: Function
});

const course = ref('');
const tableData = ref([])
const courses = ref([])
const columns = ref([])
const render = ref(0)
const data = ref([])
onMounted(async () => {
        if (props.flag == 'LR') {
            const res = await props.API.get('/pullMyLeaveRequests').catch((err) => props.catchNetworkError(err))
            if ([...res.data].length == 0) {
                data.value = 'no requests yet'
            } else {
                data.value = [...res.data]
                columns.value = Object.keys([...data.value][0]).reverse()
            }
        } else if (props.flag == 'AH') {
            const res = await props.API.get('/pullMyCourses').catch((err) => props.catchNetworkError(err));
            const res2 = await props.API.get('/pullTableData').catch((err) => props.catchNetworkError(err));
            tableData.value = [...res2.data]
            courses.value = [...res.data]
        }
        render.value = 1
    });
    
    
    watch(course, async () => {
        if (course.value == '' || course.value == 'a') {
            return
    }
    const res = await props.API.post('/pullMyStats', JSON.stringify({
        course: course.value
    }), {
                onUploadProgress: e => props.progressBarManagement(e)
        }).catch((err) => props.catchNetworkError(err))
    if ([...res.data].length == 0) {
                data.value = []
        } else {
                data.value = [...res.data]
                columns.value = Object.keys([...data.value][0]).reverse()
        }
});
</script>

<style src="./styles.css" scoped></style>