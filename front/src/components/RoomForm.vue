<template>
    <h2>部屋をつくる</h2>
    部屋名<br>
    <input type="text" v-model="room_name"><br>
    人数<br>
    <select name="人数" v-model="room_capa"><br>
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
        <option value=9>9</option>
        <option value=10>10</option>
    </select><br>
    <!-- ユーザー名<br>
    <input type="text" v-model="username"><br><br> -->
    <button @click="CreateRoomEvt()">作成</button><br>
    <cookie-controller
        ref="child"
    />
</template>

<script>
import { getDatabase, ref, push } from "firebase/database";
import CookieController from "@/components/CookieController";

export default {
    name: "RoomForm",
    components: {
        CookieController
    },
    data() {
        return {
            room_name: "",
            room_capa: "",
            username: "",
        }
    },
    methods: {
        CreateRoomEvt(){
            const db = getDatabase();
            // 入力情報が全て入っているか確認
            if(this.room_name != ""  && this.room_capa != "") {
                // 部屋作成(userは作成と同時にカウント１、idは使用していないので0固定)
                push(ref(db, "Rooms"), {name: this.room_name, capacity: this.room_capa, users: 1, id: 0})
                .then(res => {  // thenは非同期実行。つまりpushが完了したのちに呼ばれている
                    // Cookie発行
                    this.$refs.child.SetCookie()
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
    h1 {
        background-color: antiquewhite;
    }
    .flex {
        display:flex;             /* 縦二分割 */
        justify-content: left;    /* 中央寄せ */
        background-color: aquamarine;
    }
    .menu {
        margin:0px 10px;
    }
</style>