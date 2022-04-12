<template>
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
                <td>{{ room.name }}</td>
                <td>{{ room.users }}/{{ room.capacity }}</td>
                <td><button @click="EnterRoom(room.capacity, room.users, key)">入室</button></td>
            </tr>
            <cookie-controller
                ref="child"
            />
        </tbody>
    </table>
</template>

<script>
// getはデータベースから、onValueはクライアントのキャッシュからデータを取得するらしい
// 参考：https://doz13189.hatenablog.com/entry/2019/02/03/030706
import { getDatabase, ref, onValue, update } from "firebase/database";
import CookieController from '@/components/CookieController'

export default {
    name: "RoomList",
    components: {
        CookieController
    },
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
                    // Cookie発行
                    this.$refs.child.SetCookie()
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
    td {
        text-align: center;
        border: 2px black solid
    }
    table {
        border: 2px black solid
    }
</style>
