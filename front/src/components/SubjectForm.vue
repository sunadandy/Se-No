<template>
    <div>
        <input type=text placeholder="お題を設定しよう！" size=60 v-on:keyup.enter='SubmitSubject' ref="input"><br>
    </div>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";

export default {
    name: "SubjectForm",
    data() {
        return {
            subject: "",
        }
    },
    methods: {
        SubmitSubject: function() {
            const key = this.$route.params.id
            const db = getDatabase();
            const refdb = ref(db, "QA")
            this.subject = this.$refs.input.value

            // お題をDBに送信
            set(refdb, {[key]: {"subject": this.subject}})
            // DBへのセットが完了したので入力フォームをクリア
            this.$refs.input.value = null
            // [Issue]お題設定完了アニメーションを追加したい（jQuery？）
        }
    }
};
</script>

<style scoped>
</style>