<template>
    <div>
        <button @click="ExitRoom($route.params.id)">退出する</button><br>
    </div>
</template>

<script>
import { getDatabase, ref, update, remove, onValue } from "firebase/database";

export default {
    name: "RoomExit",
    data() {
        return {
            room: []
        }
    },
    methods: {
        ExitRoom(key) {
            const db = getDatabase();
            const refdb = ref(db, 'Rooms/' + key)
            onValue(refdb, (obj) => {
                if (obj.exists()) {
                    this.room = obj.val()
                }
                // 部屋人数が１の状態で退出した場合、部屋を削除
                if(this.room.users === 1){
                    remove(refdb)
                    .then(() => {
                        // リダイレクト
                        this.$router.push("/")
                    })
                } else {
                    // usersカウンターをデクリメント
                    update(refdb, {"users": this.room.users -1})
                    .then(() => {
                        // リダイレクト
                        this.$router.push("/")
                    })
                }
            }, { onlyOnce: true });
        },
    },
}
</script>
