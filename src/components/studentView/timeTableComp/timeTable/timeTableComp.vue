<template v-if="render">
    <SL :theme="theme" :backToComponent="studentPortal" :changeCurrentComponent="changeCurrentComponent">
        <FullCalendar :options="option"/>
    </SL>
</template>

<script setup>
import { defineProps, onMounted, ref} from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import leaveRequestForm from '../leaveRequestForm/leaveRequestForm.vue';
import SL from '@/components/abstractiveComponents/subcomponentLayout/SL.vue';
import studentPortal from '../../studentPortal/studentPortal.vue';

const props = defineProps({
    changeCurrentComponent: Function,
    theme: Number,
    SLRMD: {
      required: true,
      type: Function
    },
    API: Function
  });

  const render = ref(0)
  const data = ref({}) 
  const pr_d = ref([])
  const days = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
  };
  onMounted(async () => {
    const res  = await props.API.get('/pullTimeTable')
    data.value = await res.data;
    [...data.value].forEach((e) => {
      pr_d.value.push({
        title: e.course__courseName,
        startTime: e.start,
        endTime: e.end,
        daysOfWeek: [days[e.day]]
      })
      option.value.events = [...pr_d.value]
    })
    render.value = 1;
  });

  const option = ref({
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: "timeGridWeek",
      hiddenDays: [5, 6],
      slotMinTime: "08:00:00",
      slotMaxTime: "20:00:00",
      height: "50vh",
    events: [],
    eventClick: (info) => {
      let date = String(info.el.fcSeg.end).split(' ');
      console.log(date);
      date = date[3] + '-' + (new Date(Date.parse("1 " + date[1] + " 2012")).getMonth() + 1) + '-' + date[2]
      props.SLRMD({
            date: date,
            lectureName: info.el.fcSeg.eventRange.def.title,
        })
        props.changeCurrentComponent(leaveRequestForm)
      },
      eventTextColor: "#e0e0e0",
      eventColor:  "#005011",
    headerToolbar: {
        left: "prev,next today",
      center: "title",
      right: "",
  },
  });



</script>

