<template>
    <div class="room-list">
        <h2>現在作られている部屋一覧</h2>
        <table>
            <thead>
                <tr>
                    <th>部屋名</th>
                    <th>入室状況</th>
                </tr>
            </thead>
            <tbody>
                <!-- keyはなんでもいい -->
                <tr v-for="(room, key) in rooms" :key="room.id">
                    <td class="room-name">{{ room.name }}</td>
                    <td class="room-capa">{{ room.users }}/{{ room.capacity }}</td>
                    <td><button @click="EnterRoom(room.capacity, room.users, key)">入室</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// getはデータベースから、onValueはクライアントのキャッシュからデータを取得するらしい
// 参考：https://doz13189.hatenablog.com/entry/2019/02/03/030706
import { getDatabase, ref, onValue, update } from "firebase/database";

export default {
    name: "RoomList",
    data() {
        return {
            rooms: [],
        }
    },
    mounted: function() {
        const db = getDatabase();
        onValue(ref(db, 'Rooms'), (obj) => {
            if (obj.exists()) {
                this.rooms = obj.val()
            }
        }, { onlyOnce: false });
    },
    methods: {
        EnterRoom: function(room_capa, room_users, key) {
            if(room_capa != room_users) {
                const db = getDatabase()
                // 入室前にユーザーカウンタをインクリメント
                update(ref(db, "Rooms/" + key), {"users": room_users + 1})
                .then(() => {
                    // 入室番号発行
                    this.$store.commit('SetRoomEnterNo')
                    // リダイレクト
                    this.$router.push({name: "RoomView", params: {id: key}})
                })
            } else {
                alert("満員です")
            }
        },
    }
};
</script>

<style scoped>
    .room-list {
        text-align: center;
        border: 3px black solid;
        margin-top: 20px;
    }
    table {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
    }
    tbody {
        padding: 0px 10px;
    }
    td.room-name {
        width: 400px;
        text-align: center;
        border: 2px black solid;
    }
    td.room-capa {
        width: 100px;
        text-align: center;
        border: 2px black solid;
    }
</style>
