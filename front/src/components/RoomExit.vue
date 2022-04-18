<template>
    <div>
        <button @click="ExitRoom">EXIT</button><br>
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
            const db = getDatabase();
            const refdb = ref(db, 'Rooms/' + key)

            // 部屋人数が１の状態で退出した場合、部屋を削除
            if(this.users === 1){
                // お題DB削除
                remove(ref(db, 'QA/' + key))
                // 部屋DB削除
                remove(refdb)
                .then(() => {
                    // リダイレクト
                    this.$router.push("/")
                })
            } else {
                // usersカウンターをデクリメント
                // [Issue]更新した直後にページが更新されるため、リダイレクトより先に画面描画が走ってしまう
                // -> この瞬間だけmountedが機能しないようにフラグを持たせる？
                update(refdb, {"users": this.users -1})
                .then(() => {
                    // リダイレクト
                    this.$router.push("/")
                })
            }
        },
    },
}
</script>
