<template>
    お題入力：<input type=text placeholder="ここにお題を入力してください。" size=60 v-model='subject'>
    <button @click="SetSubject">設定</button>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";

export default {
    name: "SubjectForm",
    data() {
        return {
            subject: ""
        }
    },
    methods: {
        SetSubject: function() {
            let key = this.$route.params.id

            const db = getDatabase();
            set(ref(db, "Q&A/" + key), {"subject": this.subject})
        },
    }
};
</script>

<style scoped>
</style>