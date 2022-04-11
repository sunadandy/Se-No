<template>
    <div>
        <button @click="ExitRoom_child($route.params.id)">退出する</button><br>
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
        ExitRoom_child(key){
            this.$emit('ExitRoom', key)
        }
    },
}
</script>
