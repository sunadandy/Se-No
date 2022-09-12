<template>
    <div class="room-form">
        <h2>部屋をつくる</h2>
            <v-col class="d-flex" cols="12" sm="16">
                <v-text-field v-model="room_name" label="部屋名入力" variant="underlined"></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="16">
                <v-select v-model="room_capa" :items="items" label="人数" variant="underlined"></v-select>
            </v-col>
        <v-btn flat rounded="pill" color="success" @click="CreateRoomEvt()">作成</v-btn>
    </div>
</template>

<script>
import { getDatabase, ref, push } from "firebase/database";

export default {
    name: "RoomForm",
    data() {
        return {
            room_name: null,
            room_capa: null,
            items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        }
    },
    methods: {
        CreateRoomEvt(){
            const db = getDatabase();
            // 入力情報が全て入っているか確認
            if(this.room_name != ""  && this.room_capa != "") {
                // 部屋作成(userは作成と同時にカウント１)
                push(ref(db, "Rooms"), {name: this.room_name, capacity: Number(this.room_capa), users: 1, delete: false})
                .then(res => {  // thenは非同期実行。つまりpushが完了したのちに呼ばれている
                    // 入室番号発行
                    this.$store.commit('SetRoomEnterNo')
                    // リダイレクト
                    this.$router.push({name: "RoomView", params: {id: res.key}})
                })
            } else {
                alert("入力情報が正しくありません。")
            }
        },
    }
};
</script>

<style scoped>
    .room-form {
        text-align: center;
        border: 2px solid rgb(161, 158, 158);
        padding: 20px 0px;
        margin: 10px 0px;
    }
</style>