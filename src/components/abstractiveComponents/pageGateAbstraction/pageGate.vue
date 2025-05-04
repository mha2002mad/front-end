<template>
  <div :class="`${props.theme.valueOf() ? 'darkLogOutButton' : 'whiteLogOutButton'}`">
      <p @click="logOut" :id="`${props.theme.valueOf() ? 'darkLogOutTXT' : 'whiteLogOutTXT'}`">log out</p>
    </div>
  <p :class="`${props.theme ? 'nameDark' : 'nameWhite'}`">welcome, {{ name.valueOf() }}</p>
    <div class="container" :id="`${theme ? 'containerDark' : 'containerWhite'}`">
        <div :id="`${theme ? 'darkNavBar' : 'whiteNavBar'}`">
            <p v-for="(item, index) in links" :key="index" @click="()=>{changeCurrentComponent(item.component)}" :class="`${theme ? 'linksDark' : 'linksWhite'}`">{{ item.name }}</p>
        </div>
        <template v-if="([...precenceValuesForDiagram.valueOf()].length != 0)">
          <div id="chartsLayout" style="display: grid; grid-template-columns: repeat(3, 30vh); grid-template-rows: repeat(2, 30vh);">
            <div v-for="(item, index) in [...precenceValuesForDiagram.valueOf()]" :key="index" class="placeHolderLayout">
              <p :class="`${theme ? 'darkTitle' : 'lightTitle'}`">{{ Object.keys(item)[0] }}</p>
              <div id="c1" :ref="e => setDiagramToRef(e, index)" style="height: 22vh; width: 20vw;"></div>
            </div>
          </div>
        </template>
    </div>
</template>

<script setup>
import { defineProps, nextTick, onMounted, ref, toRef, watch } from 'vue';
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import * as echarts from 'echarts'
import { use } from 'echarts/core';
import { notify } from '@kyvg/vue3-notification';

const props = defineProps({
  theme: Number,
  changeCurrentComponent: Function, 
  links: Object,
  API: Function,
});

use([CanvasRenderer, GaugeChart]);

const precenceValuesForDiagram = ref([])
const name = ref('')
const diagrams = ref([])
const charts = ref([])
async function setdata(){
    const res = await props.API.get('/pullPercentages').catch((err) => props.catchNetworkError(err));
    const pullName = await props.API.get('/pullName').catch((err) => props.catchNetworkError(err))
    name.value = pullName.data
    precenceValuesForDiagram.value = res.data
}

function setDiagramToRef(el, ind){
  diagrams.value[ind] = el
}

onMounted(async () => {
  await setdata()
  await nextTick()
  const keys = []
 precenceValuesForDiagram.value.forEach((e) => {
    keys.push(Object.keys(e)[0])
 })


  diagrams.value.forEach((d, i) => {
    charts.value[i] = echarts.init(d)
    charts.value[i].setOption({
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
          value: (precenceValuesForDiagram.value[i][keys[i]]) == 'NaN' ? 0 : Number.parseInt(precenceValuesForDiagram.value[i][keys[i]]),
          }],
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
    },
  ],
})
})
  precenceValuesForDiagram.value.forEach((obj) => {
    let val = obj[Object.keys(obj)[0]];
    if (val < 90) {
      notify({
        type:'warn',
        text: `you have mild warning in ${Object.keys(obj)[0]}`,
        duration: 10000,
        closeOnClick: true
      })
    } else if (val < 80) {
      notify({
        type:'warn',
        text: `you have moderate warning in ${Object.keys(obj)[0]}`,
        duration: 10000,
        closeOnClick: true
      })
    } else if (val < 70) {
      notify({
        type:'warn',
        text: `you have serious warning in ${Object.keys(obj)[0]}`,
        duration: 10000,
        closeOnClick: true
      })
    }
  })

});


watch(() => toRef(props).value.theme, async (o) => {
  charts.value.forEach((d) => {
    console.log(d.getOption());
    let opt = d.getOption()
    opt.series[0].detail.color = o.valueOf() ? "#eee" : "#444"
    d.setOption(opt)
  })
});


async function logOut(){
  await props.API.get('/logOut')
  window.location.href = '/login'
}
</script>

<style src="./styles.css" scoped></style>