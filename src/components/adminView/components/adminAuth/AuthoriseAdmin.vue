<template>
    <form @submit.prevent="loginAttempt" :id="`${theme ? 'formDark' : 'formWhite'}`" method="post">
      <p :id="`${theme ? 'captionDark' : 'captionWhite'}`"> login </p>
      <input type="text" v-model="username" :class="`${theme ? 'inputDark' : 'inputWhite'}`" placeholder="username" required>
      <input type="password" v-model="password" :class="`${theme ? 'inputDark' : 'inputWhite'}`"  placeholder="password" required>
      <textarea v-model="passKey" :class="`${theme ? 'inputDark' : 'inputWhite'}`" placeholder="pass key" type="text" required></textarea>
      <input type="submit" :id="`${theme ? 'submitButtonDark': 'submitButtonWhite'}`" value="LOGIN" >
    </form>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import adminPortal from '../adminPortal/adminPortal.vue';

const username = ref('')
const password = ref('')
const passKey = ref('')

const props = defineProps({
  theme: Number,
  API: Function,
  cookie: Object,
  progressBarManagement: Function,
  responseManagement: Function,
  catchNetworkError: Function,
  LCSRF: Function,
  changeCurrentComponent: Function
});




const loginAttempt = async () => {
    const res = await props.API.post('/adminLogin', JSON.stringify({
      'username': username.value,
      'password': password.value,
      'passKey':  passKey.value,
    }), {
      onUploadProgress: (e)=> props.progressBarManagement(e),
    }).catch((e) => {
      props.catchNetworkError(e)
    });
    if (res.data['message'] == 'success') {
        props.changeCurrentComponent(adminPortal)
        return ;
      } else {
        notify({
            type: 'error',
            text: 'adminstrator authentication failed'
        })
      }
  };



</script>


<style src="./styles.css" scoped></style>