<template>
    <p class="room-header">
        {{ roomObj.users }}/{{ roomObj.capacity }}が入室中（あなたの入室番号は{{ EnterNo }}）
    </p>
    <p class="current-subject">
        現在のお題：{{ subjectObj.subject }}
    </p>
    <div>
        <subject-form />
    </div>
    <div id="se-no-btn">
        <v-btn rounded="circle" color="secondary" size="x-large" @click="ShowAnswers" :disabled="isPush">せーの！</v-btn>
    </div>
    <div id="user-icon">
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
            isPush: true,
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
            if(this.answerNum === this.roomObj.users) {
                this.isPush = false
            } else {
                this.isPush = true
            }

            // リザルトトリガを監視してクライアントの画面一斉表示を判断
            if(this.subjectObj.resultTrigger === 1){
                const key = this.$route.params.id
                this.$router.push({name: "Answer", params: {id: key, attri: "answer"}})
            }
        },
        roomObj: function(){
            /*
            上の同じ内容なのはお題DBの変更を起点とするか、部屋DBの変更を起点とするかが区別できないから
            */
            if(this.answerNum === this.roomObj.users) {
                this.isPush = false
            } else {
                this.isPush = true
            }
        }
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
                // 子コンポーネントに渡すデータなのでDB同期に合わせて更新
                this.subject = this.subjectObj.subject
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
#user-icon {
    text-align: center;
    margin: 20px px;
}
img {
    margin:10px 50px;
}
p.room-header {
    font-size: 11px;
    margin: 5px;
    text-align: right;
}
p.current-subject {
    margin: 10px;
    padding-bottom: 10px;
}
div#se-no-btn {
    text-align: center;
    padding-bottom: 50px;
}
</style>