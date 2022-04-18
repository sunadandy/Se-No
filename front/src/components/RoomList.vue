<template>
    <div class="room-list">
        <h2>現在作られている部屋一覧</h2>
        <v-row class="room-table" justify="center">
            <v-table>
                <thead>
                    <tr>
                        <th class="room-name">部屋名</th>
                        <th class="room-capa">入室状況</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(room, key) in rooms" :key="room.id">
                        <td class="room-name">{{ room.name }}</td>
                        <td class="room-capa">{{ room.users }}/{{ room.capacity }}</td>
                        <td><v-btn flat :rounded="0" color="success" @click="EnterRoom(room.capacity, room.users, key)">ENTER</v-btn></td>
                    </tr>
                </tbody>
            </v-table>
        </v-row>
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
    h2 {
        text-align: center;
    }
    .room-list {
        border: 2px rgb(161, 158, 158) solid;
        margin: 10px 0px;
        padding: 20px 0px;
    }
    .room-table {
        margin: auto 10px;
    }
    .room-name {
        width: 500px;
        text-align: left;
    }
    .room-capa {
        width: 100px;
        text-align: center;
    }
</style>
