<template>
  <div :id="`${themeTracer.valueOf() ? 'pageDark': 'pageWhite'}`">
    <img :src="`./assets/img/${themeTracer.valueOf() ? 'sun.png' : 'moon.png'}`" @click="changeThemeTracerValue" alt="change theme" id="icon">
    <div :id="`${themeTracer.valueOf() ? 'waitingSpinnerDark': 'waitingSpinnerWhite'}`" :style="`width: ${progress.valueOf()}%; ${waitingSpinnerController.valueOf() ? 'visibility: visible': 'visibility: hidden'};`"></div>
    <component :is="theView" :LCSRF="loadcsrf" :progressBarManagement="progressBarManagement" :responseManagement="responseManagement" :catchNetworkError="catchNetworkError" :API="API" :cookie="cookie" :theme="themeTracer"></component>
    <Notifications ref="notification" style="margin: 13vh 9vh; transform: scale(1.4);" position="bottom right" />
  </div>
</template>

<script setup>
import { Notifications } from '@kyvg/vue3-notification';
import { defineProps, ref, onMounted } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from "axios";
import Cookies from "universal-cookie";


const cookie = new Cookies();
const API = axios.create({
    withCredentials: true,
    baseURL: "http://127.0.0.1:8000"
});

defineProps({
  theView: {
    type: Object,
    required: true
  }
})

const waitingSpinnerController = ref(0);
const themeTracer = ref(0);
const progress = ref(0)

const changeThemeTracerValue = () => {
  if (themeTracer.value) {
    themeTracer.value = 0
    return ;
  }
  themeTracer.value = 1
}

const progressMarch = (value) => {
  progress.value = value
}

const changeProgressBarVisibility = (value) => {
  waitingSpinnerController.value = value
  return;
}

const progressBarManagement = async (event) => {
    await changeProgressBarVisibility(1)
        await progressMarch((event.loaded / event.total) * 100)
        await setTimeout(() => {
          changeProgressBarVisibility(0)
        }, 200);
  }

const responseManagement = async (response, title) => {
     if ((typeof response.data) == 'object') {
       for(let obj in response.data){
        if (Array.isArray(response.data[obj])) {
          for (let index = 0; index < response.data[obj].length; index++) {
              notify({
                type: response.data[obj][index] == 'success' ? 'success' : 'error',
                  title: title,
                  text: response.data[obj][index],
                });
          }
        } else {
          notify({
            type: response.data[obj] == 'success' ? 'success' : 'error',
                  title: title,
                  text: response.data[obj],
                });
        }
      }
      return ;
    }
  }


const catchNetworkError = (e) => {
  notify({
    type: 'error',
    title: e['message'],
          text: 'problem encountered on server, or your network'
        });
};

async function loadcsrf(){
  API.defaults.headers.post['X-CSRFToken'] = await cookie.get('csrftoken')
}

  onMounted(async () => {
    API.get('/csrf');
    API.defaults.headers.post['Content-Type'] = 'application/json';
  });

</script>

<style src="./styles.css"></style>