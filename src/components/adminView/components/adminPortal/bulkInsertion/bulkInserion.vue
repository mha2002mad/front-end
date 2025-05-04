<template>
        <form id="form" @submit.prevent="submitData">
            <p :id="`${props.theme ? 'darkLabel' : 'whiteLabel'}`">please provide a CSV file containing following attributes in order: firstname | lastname | department name | major | stage</p>
            <input type="file" @change="(event) => readCsvAsString(event)" required>
            <input :id="`${props.theme ? 'submitButtonDark' : 'submitButtonWhite'}`" type="submit" value="submit">
        </form>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { csv2json } from 'csvjson-csv2json';
import { notify } from '@kyvg/vue3-notification';

const jsoned = ref([])
const props = defineProps({
    theme: Number,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function,
    API: Function,
    cookie: Object,
    changeCurrentComponent: Function
});


async function submitData(){
    const res = await props.API.post('/storeStudentsInBulk', csv2json(jsoned.value), {
        onUploadProgress:(e) => props.progressBarManagement(e)
    })
    if (res.data['message'] == 'success') {
        notify({
            type: 'success',
            text: 'successfully stored'
        })
    } else {
        notify({
            type: 'error',
            text: res.data['message'],
            closeOnClick: true,
            duration: 1200000
        })
    }
}


function readCsvAsString(event){
    const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    const csvContent = e.target.result
    jsoned.value = csvContent
  }

  reader.onerror = (e) => {
    console.error('Error reading file:', e)
  }

  reader.readAsText(file)
}
</script>

<style src="./styles.css" scoped></style>