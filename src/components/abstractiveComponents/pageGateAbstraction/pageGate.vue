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
import { defineProps, nextTick, onMounted, ref, toRef, watch } from 'vue';
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import * as echarts from 'echarts'
import { use } from 'echarts/core';

const props = defineProps({
  theme: Number,
  changeCurrentComponent: Function, 
  links: Object,
  graphCaption: Array,
  API: Function,
});

use([CanvasRenderer, GaugeChart]);

const WP = ref(0);
const MP = ref(0);

async function setdata(){
    const res = await props.API.get('/pullPercentages')
    WP.value = Number.parseInt(await res.data['weeklyPresence'])
    MP.value = Number.parseInt( await res.data['monthlyPresence'])
}
const c1 = ref(null)
const c2 = ref(null)
  
  const optionsForMonthlyPresence = ref({
    series: [
      {
      type: "gauge",
      radius: '100%',

      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          color: {
            type: "linear",
            x: 100,
            x2: 270,
            global: true,
            colorStops: [
              { offset: 0, color: '#E02F1E' },
              { offset: 0.1, color: '#E53C2B' },
              { offset: 0.2, color: '#ED7936' },
              { offset: 0.3, color: '#F19C3C' },
              { offset: 0.41, color: '#E9AD3C' },
              { offset: 0.52, color: '#E0BF3C' },
              { offset: 0.63, color: '#BCBC33' },
              { offset: 0.72, color: '#75B520' },
              { offset: 0.86, color: '#29bb0C' },
              { offset: 1, color: '#01bb01' },  
            ]
          },
        },
      },
      axisLine: {
        lineStyle: {
          width: 10,
        },
      },
      detail: {
        valueAnimation: true,
        formatter: "{value}%",
        fontSize: 47,
        color: "#444",
        offsetCenter: [0, "-15%"],
      },
      data: [
        { 
          value: MP,
          }],
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
    },
  ],
});
  const optionsForWeeklyPresence = ref({
    series: [
      {
      type: "gauge",
      radius: '100%',

      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          color: {
            type: "linear",
            x: 100,
            x2: 270,
            global: true,
            colorStops: [
              { offset: 0, color: '#E02F1E' },
              { offset: 0.1, color: '#E53C2B' },
              { offset: 0.2, color: '#ED7936' },
              { offset: 0.3, color: '#F19C3C' },
              { offset: 0.41, color: '#E9AD3C' },
              { offset: 0.52, color: '#E0BF3C' },
              { offset: 0.63, color: '#BCBC33' },
              { offset: 0.72, color: '#75B520' },
              { offset: 0.86, color: '#29bb0C' },
              { offset: 1, color: '#01bb01' },  
            ]
          },
        },
      },
      axisLine: {
        lineStyle: {
          width: 10,
        },
      },
      detail: {
        valueAnimation: true,
        formatter: "{value}%",
        fontSize: 47,
        color: "#444",
        offsetCenter: [0, "-15%"],
      },
      data: [
        { 
          value: WP,
          }],
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
    },
  ],
});


const charts = ref([])
onMounted(async () => {
  await setdata()
  charts.value[0] = echarts.init(c1.value)
  charts.value[0].setOption(optionsForMonthlyPresence.value)
  charts.value[1] = echarts.init(c2.value)
  charts.value[1].setOption(optionsForWeeklyPresence.value)
});


watch(() => toRef(props).value.theme, async (o) => {
  await nextTick()
  if (o.valueOf() === 0) {
    optionsForMonthlyPresence.value.series[0].detail.color = "#444"
    optionsForWeeklyPresence.value.series[0].detail.color = "#444"
    charts.value[0].setOption(optionsForMonthlyPresence.value)
    charts.value[1].setOption(optionsForWeeklyPresence.value)
  } else {
    optionsForMonthlyPresence.value.series[0].detail.color = "#eee"
    optionsForWeeklyPresence.value.series[0].detail.color = "#eee"
    charts.value[0].setOption(optionsForMonthlyPresence.value)
    charts.value[1].setOption(optionsForWeeklyPresence.value)
  }
});



</script>

<style src="./styles.css" scoped></style>