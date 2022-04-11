<template>
    お題入力：<input type=text placeholder="ここにお題を入力してください。" size=60 v-model='subject'>
    <button @click="SetSubject">設定</button>
</template>

<script>
import { getDatabase, ref, update } from "firebase/database";

export default {
    name: "SubjectForm",
    data() {
        return {
            subject: ""
        }
    },
    methods: {
        SetSubject: function() {
            // URLからキー取得
            let key = this.$route.params.id

            const db = getDatabase();
            update(ref(db, "Rooms/" + key), {"subject": this.subject})
            .then(() => {
                // リダイレクト
                this.$router.push("/Room/" + key)
            })
        },
    }
};
</script>

<style scoped>
</style>