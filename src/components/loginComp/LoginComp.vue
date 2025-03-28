<template>
    <form v-if="render" @submit.prevent="loginAttempt" :id="`${theme ? 'formDark' : 'formWhite'}`" method="post">
      <p :id="`${theme ? 'captionDark' : 'captionWhite'}`">login </p>
      <input type="text" v-model="username" :class="`${theme ? 'inputDark' : 'inputWhite'}`" placeholder="username" required>
      <input type="text" v-model="password" :class="`${theme ? 'inputDark' : 'inputWhite'}`"  placeholder="password" required>
      <select name="role" v-model="role" :id="`${theme ? 'selectDark' : 'selectWhite'}`"  required>
        <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" value="none" hidden selected disabled>select your role</option>
        <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" value="student">student</option>
        <option :class="`${theme ? 'optionDark' : 'optionWhite'}`" value="teacher" >teacher</option>
      </select>
      <input type="submit" :id="`${theme ? 'submitButtonDark': 'submitButtonWhite'}`" value="LOGIN" >
    </form>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';

const username = ref('')
const password = ref('')
const role = ref('role')
const render = ref(0)

const props = defineProps({
  theme: Number,
  API: Function,
  cookie: Object,
  progressBarManagement: Function,
  responseManagement: Function,
  catchNetworkError: Function,
  LCSRF: Function
});

onMounted(()=>{
  props.LCSRF()
  props.API.get('/amILogedIn').then((r)=>{
    if (r.data['message'] == 'negative') {
      render.value = 1
    } else if (r.data['message'] == 'T') {
      window.location.href = '/teacherPortal'
    } else {
      window.location.href = '/studentPortal'
    }
  })
})



const loginAttempt = async () => {
    props.API.post('/login', JSON.stringify({
      'username': username.value,
      'password': password.value,
      'role': role.value
    }), {
      onUploadProgress: (e)=> props.progressBarManagement(e),
    } ).then(async (r)=> {
      await props.responseManagement(r, 'login')
      if (r.data['message'] == 'success') {
        if (role.value == 'student') {
          window.location.href = '/studentPortal'
        }else{
          window.location.href = '/teacherPortal'
        }
      }
      })
    .catch((e) => {
      props.catchNetworkError(e)
    });
  };



</script>


<style src="./styles.css" scoped></style>