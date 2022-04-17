<template>
    <div>
    現在のお題：{{ subjectObj.subject }}
    </div>
    <div>
        <subject-form />
        <button class="se-no btn" @click="ShowAnswers" :disabled="isPush">せーの！</button>
    </div>
    <div class="flex">
        <div v-for="ans in subjectObj.answer" :key="ans">
            <img src="@/assets/images/sozai_cman_jp_20220414000053.png">
        </div>
        <!-- [Issue]この処理警告アリ -->
        <div v-for="no_ans in room.users - answerNum" :key="no_ans">
            <img src="@/assets/images/sozai_cman_jp_20220414000129.png">
        </div>
    </div>
    <div>
        {{ room.subject }}
    </div>
    <div>
        <answer-form />
    </div>
    <div>
        <room-exit />
    </div>
</template>

<script>
import RoomExit from '@/components/RoomExit'
import SubjectForm from '@/components/SubjectForm'
import AnswerForm from '@/components/AnswerForm'
import { getDatabase, ref, onValue } from "firebase/database"

export default {
    name: "RoomView",
    components: {
        RoomExit,
        SubjectForm,
        AnswerForm,
    },
    data() {
        return {
            room: [],
            subjectObj: [],
            answerNum: Number,
            isPush: true
        }
    },
    watch: {
        subjectObj: function() {
            // お題DBから回答数を取得。回答がまだ存在しない場合は0を設定
            if(this.subjectObj.answer){
                this.answerNum = Object.keys(this.subjectObj.answer).length
            } else {
                this.answerNum = 0
            }

            // 入室数と回答数が等しくなったらせーの！ボタンを押下可能に。
            if(this.answerNum === this.room.users) {
                this.isPush = false
            }
        }
    },
    mounted: function() {
        // URLからキー取得
        const key = this.$route.params.id
        const db = getDatabase();
        // ルームDB読み込み
        onValue(ref(db, 'Rooms/' + key), (obj) => {
            if (obj.exists()) {
                this.room = obj.val()
            }
        }, { onlyOnce: false });
        // お題DB読み込み
        onValue(ref(db, 'QA/' + key), (obj) => {
            if (obj.exists()) {
                this.subjectObj = obj.val()
            }
        }, { onlyOnce: false });
    },
    methods: {
        ShowAnswers: function() {
            const key = this.$route.params.id
            this.$router.push({name: "Answer", params: {id: key, attri: "answer"}})
        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
}
</style>