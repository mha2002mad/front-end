<template>
    <div :id="`${theme ? 'darkComponentLayout' : 'whiteComponentLayout'}`">
        <img id="img" :src="`./assets/img/${theme ? 'darkback.png' : 'whiteback.png'}`"  @click="changeCurrentComponent(backToComponent)"/>
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    theme: Number,
    changeCurrentComponent: Function,
    backToComponent: Object
});
</script>

<style scoped src="./styles.css"></style>