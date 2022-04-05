<template>
    部屋名と部屋人数を指定してください。<br><br>
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
</template>

<script>
export default {
    name: "RoomForm",
    data() {
        return {
            room_name: "",
            room_capa: "",
            username: "",
        }
    },
    methods: {
        CreateRoomEvt(){
            // 入力情報が全て入っているか確認
            if(this.room_name != ""  && this.room_capa != "") {
                // 部屋一覧の取得
                let rooms = this.$store.getters.GetRoomList
                // 一番最後に追加された部屋のIDを取得
                let roomNum = Object.keys(rooms).length
                let max_room_id = rooms[roomNum - 1].id
                // 部屋作成
                this.$store.commit('AddRoom', {id: max_room_id+1, name: this.room_name, capacity: this.room_capa, users: 1})
                // リダイレクト
                this.$router.push({name: "RoomView", params: {id: max_room_id+1}})
            } else {
                alert("入力情報が正しくありません。")
            }
        }
    }
};
</script>

<style scoped>
</style>