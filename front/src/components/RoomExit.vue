<template>
    <div>
        <button @click="ExitRoom($route.params.id)">EXIT</button><br>
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
                    // [Issue]更新した直後にページが更新されるため、リダイレクトより先に画面描画が走ってしまう
                    // -> この瞬間だけmountedが機能しないようにフラグを持たせる？
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
