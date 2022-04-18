<template>
    <v-alert class="header"
      prominent
      type="error"
      variant="outlined"
      density="compact"
    >
      ブラウザバックしないで！
    </v-alert>
    <div class="flex">
        <div class="answer-card" v-for="ans in subjectObj" :key="ans">
            <v-card
                width="200"
                height="200"
            >
                <v-card-header>
                    <div>
                        <div class="text-overline mb-1">誰かの回答</div>
                        <div class="text-h6 mb-1">{{ans}}</div>
                    </div>
                </v-card-header>
            </v-card>
        </div>
    </div>
    <div class="browser-back">
        <v-btn variant="contained-text" :rounded="0" @click="AnswerAgain">戻る</v-btn>
    </div>
</template>

<script>
import RoomExit from '@/components/RoomExit'
import { getDatabase, ref, onValue, remove, update } from "firebase/database";

export default {
    name: "AnswerPresentation",
    components: {
        RoomExit,
    },
    data() {
        return {
            subjectObj: []
        }
    },
    mounted: function() {
        // URLからキー取得
        const key = this.$route.params.id
        const db = getDatabase();
        // お題DB読み込み
        onValue(ref(db, 'QA/' + key + "/answer"), (obj) => {
            if (obj.exists()) {
                this.subjectObj = obj.val()
            }
        }, { onlyOnce: true });
    },
    methods: {
        AnswerAgain: function() {
            const key = this.$route.params.id
            const db = getDatabase();
            const enterNo = this.$store.getters.GetRoomEnterNo            
            const refdb = ref(db, "QA/" + key + "/answer/" + enterNo)

            // 自分の回答をお題DBから削除
            remove(refdb)
            update(ref(db, "QA/" + key), {"resultTrigger": 0})
            this.$router.push({name: "RoomView", params: {id: key}})
        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
}
.header {
    margin-top: 10px;
}
div.browser-back {
    text-align: right;
}
div.answer-card {
    margin: 10px 5px;
}
</style>