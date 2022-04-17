<template>
    <div>
        <!-- [Issue]お題未設定の時に回答を入力できないように -->
        <input v-on:keyup.enter="SubmitAnswer" placeholder="お題に対する回答を入力しよう！" size=80 ref="input">
    </div>
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
    methods: {
        SubmitAnswer: function() {
            const key = this.$route.params.id
            const db = getDatabase();
            const refdb = ref(db, "QA/" + key + "/answer")
            const cookieVal = this.$cookies.get("Cookie se-no")            
            this.answer = this.$refs.input.value

            // 回答をDBに送信
            update(refdb, {[cookieVal]: this.answer})
            // フォームクリア
            this.$refs.input.value = null
            // [Issue]お題設定完了アニメーションを追加したい（jQuery？）
        }
    }
}
</script>