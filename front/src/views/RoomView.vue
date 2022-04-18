<template>
    <div class="room-header">
    {{ roomObj.users }}/{{ roomObj.capacity }}が入室中（あなたの入室は{{ EnterNo }}）
    </div>
    <div class="current-subject">
    現在のお題：{{ subjectObj.subject }}
    </div>
    <div class="se-no-btn">
        <subject-form />
        <v-btn rounded="pill" color="secondary" size="x-large" @click="ShowAnswers" :disabled="isPush">せーの！</v-btn>
    </div>
    <div class="user-icon">
        <img src="@/assets/images/sozai_cman_jp_20220414000053.png" v-for="ans in subjectObj.answer" :key="ans">
        <img src="@/assets/images/sozai_cman_jp_20220414000129.png" v-for="no_ans in roomObj.users - answerNum" :key="no_ans">
    </div>
    <div>
        {{ roomObj.subject }}
    </div>
    <div>
        <answer-form v-bind:subject="subject" />
    </div>
    <div>
        <room-exit v-bind:users="roomObj.users" />
    </div>
</template>

<script>
import RoomExit from '@/components/RoomExit'
import SubjectForm from '@/components/SubjectForm'
import AnswerForm from '@/components/AnswerForm'
import { getDatabase, ref, onValue, update } from "firebase/database"

export default {
    name: "RoomView",
    components: {
        RoomExit,
        SubjectForm,
        AnswerForm,
    },
    data() {
        return {
            roomObj: [],
            subjectObj: [],
            answerNum: 0,
            subject: "",
            isPush: true,
        }
    },
    watch: {
        subjectObj: function() {
            // お題更新
            this.subject = this.subjectObj.subject

            // お題DBから回答数を取得。回答がまだ存在しない場合は0を設定
            if(this.subjectObj.answer){
                this.answerNum = Object.keys(this.subjectObj.answer).length
            } else {
                this.answerNum = 0
            }

            // 入室数と回答数が等しくなったらせーの！ボタンを押下可能に。
            if(this.answerNum === this.roomObj.users) {
                this.isPush = false
            }

            // リザルトトリガを監視してクライアントの画面一斉表示を判断
            if(this.subjectObj.resultTrigger === 1){
                const key = this.$route.params.id
                this.$router.push({name: "Answer", params: {id: key, attri: "answer"}})
            }
        },
    },
    computed: {
        EnterNo: function(){
            return this.$store.getters.GetRoomEnterNo
        }
    },
    mounted: function() {
        // URLからキー取得
        const key = this.$route.params.id
        const db = getDatabase();
        // ルームDB読み込み
        onValue(ref(db, 'Rooms/' + key), (obj) => {
            if (obj.exists()) {
                this.roomObj = obj.val()
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
            const db = getDatabase();
            update(ref(db, 'QA/' + key), {"resultTrigger": 1})
        }
    }
}
</script>

<style scoped>
.user-icon {
    text-align: center;
    margin: 20px 0px;
}
img {
    margin:0px 5px;
}
.room-header {
    font-size: 11px;
    margin: 5px;
    text-align: right;
}
.current-subject {
    margin: 10px;
    padding-bottom: 10px;
}
div.se-no-btn {
    text-align: center;
    padding-bottom: 50px;
}
</style>