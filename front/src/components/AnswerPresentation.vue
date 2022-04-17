<template>
    <div>
        <button class="se-no btn" @click="AnswerAgain">もう一度</button>
        <div class="flex">
            <div v-for="ans in subjectObj" :key="ans">
                {{ ans }}
            </div>
        </div>
    </div>
    <div>
        <room-exit />
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
            const cookieVal = this.$cookies.get("Cookie se-no")            
            const refdb = ref(db, "QA/" + key + "/answer/" + cookieVal)

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
</style>