<template>
    <div>
        <v-text-field v-on:keyup.enter="SubmitAnswer" label="回答入力" placeholder="お題に対する回答を入力しよう！" :disabled='isInput' variant="underlined" clearable ref="input">
            <v-progress-linear class="progress-liner"
                :active="submiting"
                :indeterminate="submiting"
                absolute
                color="deep-purple accent-4"
            ></v-progress-linear>
        </v-text-field>
    </div>
</template>

<script>
import { getDatabase, ref, update, onValue, remove } from "firebase/database";

export default {
    name: "AnswerForm",
    data() {
        return {
            isInput: true,
            submiting: false,
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
        },
        submiting: function(val) {
            if (!val) return
            setTimeout(() => (this.submiting = false), 500)
        }
    },
    methods: {
        SubmitAnswer: function() {
            const key = this.$route.params.id
            const db = getDatabase();
            const refdb = ref(db, "QA/" + key + "/answer")
            const enterNo = this.$store.getters.GetRoomEnterNo         
            this.answer = this.$refs.input.value
            this.submiting = true
            // 回答をDBに送信
            if(this.answer === "") {
                remove(ref(db, "QA/" + key + "/answer/" + enterNo))
            } else {
                update(refdb, {[enterNo]: this.answer})
            }
        }
    }
}
</script>

<style scoped>
.progress-liner {
    top: 35px
}
</style>