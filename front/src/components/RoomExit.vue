<template>
    <div>
        <v-btn variant="contained-text" :rounded="1" @click="ExitRoom">EXIT</v-btn>
    </div>
</template>

<script>
import { getDatabase, ref, update, remove } from "firebase/database";

export default {
    name: "RoomExit",
    data() {
        return {
            room: []
        }
    },
    props: {
        users: {
            type: Number,
        }
    },
    methods: {
        ExitRoom() {
            const key = this.$route.params.id
            const enterNo = this.$store.getters.GetRoomEnterNo
            const db = getDatabase();
            const refdb = ref(db, 'Rooms/' + key)

            // 部屋人数が１の状態で退出した場合、部屋を削除
            if(this.users === 1){
                // お題DB削除
                remove(ref(db, 'QA/' + key))
                // 部屋DB削除
                remove(refdb)
                // リダイレクト
                this.$router.push("/")
            } else {
                // usersカウンターをデクリメント
                update(refdb, {"users": this.users -1})
                // 回答削除
                remove(ref(db, 'QA/' + key + "/answer/" + enterNo))
                // リダイレクト
                this.$router.push("/")
            }
        },
    },
}
</script>

<style scoped>
</style>