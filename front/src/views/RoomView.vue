<template>
    <room-menu @ExitRoom="ExitRoom"/>
    <div>
        現在、{{ roomInfo.users }}人が入室しています。({{ roomInfo.capacity}}人部屋)<br>
    </div>
    <div>
        {{ roomInfo.subject }}
    </div>
</template>

<script>
import RoomMenu from '@/views/RoomMenu'
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

export default {
    name: "RoomView",
    components: {
        RoomMenu,
    },
    data() {
        return {
            rooms: [],
            roomInfo: [],
            question: []
        }
    },
    mounted: function() {
        // URLからキー取得
        let key = this.$route.params.id

        // 要共有化関数
        const db = getDatabase();
        onValue(ref(db, 'Rooms'), (obj) => {
            if (obj.exists()) {
                this.rooms = obj.val()
                this.roomInfo = this.rooms[key]
            }
        }, { onlyOnce: false });
    },
    methods: {
        ExitRoom(key) {
            const db = getDatabase()

            // 部屋人数が１の状態で退出した場合、部屋を削除
            if(this.roomInfo.users === 1){
                remove(ref(db, "Rooms/" + key))
                .then(() => {
                    // リダイレクト
                    this.$router.push("/")
                })
            } else {
                // usersカウンターをデクリメント
                update(ref(db, "Rooms/" + key), {"users": this.roomInfo.users -1})
                .then(() => {
                    // リダイレクト
                    this.$router.push("/")
                })
            }
        },
    }
}
</script>