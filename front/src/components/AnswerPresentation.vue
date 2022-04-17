<template>
    <div>
        <button class="se-no btn" @click="BackToRoom">もう一度</button>
    </div>
    <div>
        <room-exit />
    </div>
</template>

<script>
import RoomExit from '@/components/RoomExit'

export default {
    name: "AnswerPresentation",
    components: {
        RoomExit,
    },
    methods: {
        BackToRoom: function() {
            const key = this.$route.params.id
            this.$router.push({name: "RoomView", params: {id: key}})
        }
    }
}
</script>

<style scoped>

</style>