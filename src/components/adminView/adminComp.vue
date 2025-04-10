<template>
    <div class="container" :id="`${theme ? 'containerDark' : 'containerWhite'}`">
        <div :id="`${theme ? 'darkNavBar' : 'whiteNavBar'}`">
            <p v-for="(item, index) in links" :key="index" @click="()=>{changeCurrentComponent(item.component)}" :class="`${theme ? 'linksDark' : 'linksWhite'}`">{{ item.name }}</p>
        </div>
        <div id="chartsLayout">
          <div  class="placeHolderLayout">
            <p :class="`${theme ? 'darkTitle' : 'lightTitle'}`">{{ props.graphCaption[0] }}</p>
            <div id="c1" ref="c1" style="height: 22vh; width: 20vw;"></div>
          </div>
          <div class="placeHolderLayout">
            <p :class="`${theme ? 'darkTitle' : 'lightTitle'}`">{{ props.graphCaption[1] }}</p>
            <div id="c2" ref="c2" style="height: 22vh; width: 20vw;"></div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  theme: Number,
  changeCurrentComponent: Function,
  API: Function,
});





</script>

<style src="./styles.css" scoped></style>