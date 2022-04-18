<template>
    <v-text-field v-on:keyup.enter="SubmitAnswer" label="回答入力" placeholder="お題に対する回答を入力しよう！" :disabled='isInput' variant="underlined" clearable ref="input"></v-text-field>
</template>

<script>
import { getDatabase, ref, update } from "firebase/database";

export default {
    name: "AnswerForm",
    data() {
        return {
            answer: "",
            isInput: true,
        }
    },
    props: {
        subject: {
            type: String,
        }
    },
    watch: {
        subject: function() {
            if(this.subject !== null){
                this.isInput = false
            }
        }
    },
    methods: {
        SubmitAnswer: function() {
            const key = this.$route.params.id
            const db = getDatabase();
            const refdb = ref(db, "QA/" + key + "/answer")
            const enterNo = this.$store.getters.GetRoomEnterNo         
            this.answer = this.$refs.input.value

            // 回答をDBに送信
            update(refdb, {[enterNo]: this.answer})
            // フォームクリア -> vuetify導入後は機能していない
            // this.$refs.input.value = null
            // [Issue]お題設定完了アニメーションを追加したい（jQuery？）
        }
    }
}
</script>