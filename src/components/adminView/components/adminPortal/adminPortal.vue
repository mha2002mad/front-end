<template>
    <template v-if="render">
        <div :class="`${props.theme.valueOf() ? 'darkLogOutButton' : 'whiteLogOutButton'}`">
        <p @click="logOut" :id="`${props.theme.valueOf() ? 'darkLogOutTXT' : 'whiteLogOutTXT'}`">log out</p>
      </div>
    <p :class="`${props.theme ? 'nameDark' : 'nameWhite'}`">welcome, {{ name.valueOf() }}</p>
      <div class="container" :id="`${theme ? 'containerDark' : 'containerWhite'}`">
          <div :id="`${theme ? 'darkNavBar' : 'whiteNavBar'}`">
              <p v-for="(item, index) in links" :key="index" @click="changeCurrentComponent(item.component)" :class="`${theme ? 'linksDark' : 'linksWhite'}`">{{ item.name }}</p>
          </div>
          <Component :LCSRF="props.LCSRF" :catchNetworkError="catchNetworkError" :responseManagement="responseManagement" :progressBarManagement="progressBarManagement" :API="props.API" :is="currentComponent" :changeCurrentComponent="changeCurrentComponent" :theme="theme"></Component>
      </div>
    </template>
  </template>
  
  <script setup>
  import { defineProps, onMounted, ref } from 'vue';
  import bulkInserion from './bulkInsertion/bulkInserion.vue';
  // import TimeTable from './timeTable/timeTable.vue';
  // import modificationsComp from './modification/modificationsComp.vue';

  const render = ref(0)

  const props = defineProps({
    theme: Number,
    progressBarManagement: Function,
    responseManagement: Function,
    catchNetworkError: Function,
    API: Function,
    cookie: Object,
    });

const name = ref('')
const links = [
    {
        name: 'bulk insert',
        component: bulkInserion
    },
]


const currentComponent = ref(bulkInserion)
const changeCurrentComponent = (component) => {
  currentComponent.value = component
};

onMounted(async () => {
    const res = await props.API.get('/getAdminName');
    name.value = res.data['name']
    render.value = 1
})


  async function logOut() {
    await props.API.get('/adminLogOut')
    window.location.href = '/login'
  }
  </script>
  
  <style src="./styles.css" scoped></style>