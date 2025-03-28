<template v-if="render">
        <div v-if="(((typeof(data.valueOf())) != 'string'))" :id="`${theme ? 'darkRecordView' : 'whiteRecordView'}`">
                <div  :class="`${theme ? 'darkRecord' : 'whiteRecord'}`">
                    <p v-for="(item) in Object.keys(data.valueOf()[0]).reverse()" :key="item" style="font-weight: bolder;" :class="`${theme ? 'darkData' : 'whiteData'}`">{{ item }}</p>
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


<script setup>
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    theme: Number,
    API: Function,
    flag: String,
});

const render = ref(0)
const data = ref({})
onMounted(async () => {
        if (props.flag == 'LR') {
            const res = await props.API.get('/pullMyLeaveRequests')
            if ([...res.data].length == 0) {
                data.value = 'no requests yet'
            } else {
                data.value = [...res.data]
            }
        } else if (props.flag == 'AH') {
            const res = await props.API.get('/pullMyStats')
            if ([...res.data].length == 0) {
                data.value = 'no absencies yet'
            } else {
                data.value = [...res.data]
            }
        }
    render.value = 1
});

</script>

<style src="./styles.css" scoped></style>