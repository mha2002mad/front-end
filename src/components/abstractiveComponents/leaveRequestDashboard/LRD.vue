<template>
        <div :id="`${theme ? 'darkStuLeaveReqView' : 'whiteStuLeaveReqView'}`">
            <div :class="`${theme ? 'darkStuLeaveReqRow' : 'whiteStuLeaveReqRow'}`">
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">student</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dolorum sapiente quo tempora sed quasi facilis iste modi aut! Reprehenderit, rerum repellat sequi odio minima reiciendis blanditiis vel distinctio iure.</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">class</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">topic</p>
                <form :id="`${theme ? 'darkLeaveReqButtons' : 'whiteLeaveReqButtons'}`" @submit.prevent="">
                    <input :class="`${theme ? 'darkAcceptButton' : 'whiteAcceptButton'}`" type="submit" value="accept">
                    <input :class="`${theme ? 'darkRejectButton' : 'whiteRejectButton'}`" type="submit" value="reject">
                </form>
            </div>
            <div :class="`${theme ? 'darkStuLeaveReqRow' : 'whiteStuLeaveReqRow'}`">
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">student</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dolorum sapiente quo tempora sed quasi facilis iste modi aut! Reprehenderit, rerum repellat sequi odio minima reiciendis blanditiis vel distinctio iure.</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">class</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">topic</p>
                <form :id="`${theme ? 'darkLeaveReqButtons' : 'whiteLeaveReqButtons'}`" @submit.prevent="">
                    <input :class="`${theme ? 'darkAcceptButton' : 'whiteAcceptButton'}`" type="submit" value="accept">
                    <input :class="`${theme ? 'darkRejectButton' : 'whiteRejectButton'}`" type="submit" value="reject">
                </form>
            </div>
            <div :class="`${theme ? 'darkStuLeaveReqRow' : 'whiteStuLeaveReqRow'}`">
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">student</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dolorum sapiente quo tempora sed quasi facilis iste modi aut! Reprehenderit, rerum repellat sequi odio minima reiciendis blanditiis vel distinctio iure.</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">class</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">topic</p>
                <form :id="`${theme ? 'darkLeaveReqButtons' : 'whiteLeaveReqButtons'}`" @submit.prevent="">
                    <input :class="`${theme ? 'darkAcceptButton' : 'whiteAcceptButton'}`" type="submit" value="accept">
                    <input :class="`${theme ? 'darkRejectButton' : 'whiteRejectButton'}`" type="submit" value="reject">
                </form>
            </div>
            <div :class="`${theme ? 'darkStuLeaveReqRow' : 'whiteStuLeaveReqRow'}`">
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">student</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta dolorum sapiente quo tempora sed quasi facilis iste modi aut! Reprehenderit, rerum repellat sequi odio minima reiciendis blanditiis vel distinctio iure.</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">class</p>
                <p :class="`${theme ? 'darkStuLaveReqElements' : 'whiteStuLaveReqElements'}`">topic</p>
                <form :id="`${theme ? 'darkLeaveReqButtons' : 'whiteLeaveReqButtons'}`" @submit.prevent="">
                    <input :class="`${theme ? 'darkAcceptButton' : 'whiteAcceptButton'}`" type="submit" value="accept">
                    <input :class="`${theme ? 'darkRejectButton' : 'whiteRejectButton'}`" type="submit" value="reject">
                </form>
            </div>
        </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    theme: Number,
});

</script>

<style src="./styles.css" scoped></style>