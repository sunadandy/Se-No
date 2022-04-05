<template>
    お題：
    <input type=text placeholder="ここにお題を入力してください。" size=60 v-model='subject'>
    <button @click="SetSubject">設定</button>
</template>

<script>
export default {
    name: "SubjectForm",
    data() {
        return {
            subject: ""
        }
    },
    methods: {
        SetSubject: function() {
            this.$store.commit('StoredSubject', {id: this.$route.params.id,  subject: this.subject})
        },
    }
};
</script>

<style scoped>
</style>