<template>
    <div>
        <button @click="ExitRoom($route.params.id)">退出する</button>
        <subject-form />
    </div>
</template>

<script>
import SubjectForm from '@/components/SubjectForm.vue'

export default {
    name: "RoomMenu",
    components: {
        SubjectForm
    },
    methods: {
        ExitRoom(room_id) {
            this.$store.commit('DecrementRoomUser', room_id)
            this.$router.push("/")
        },
    },
}
</script>
