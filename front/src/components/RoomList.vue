<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>部屋名</th>
                <th>入室状況</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="room in $store.getters.GetRoomList" :key="room.id">
                <td>{{ room.id }}</td>
                <td>{{ room.name }}</td>
                <td>{{ room.users }}/{{ room.capacity }}</td>
                <td><button @click="EnterRoom(room.capacity, room.users, room.id)">入室</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "RoomList",
    methods: {
        EnterRoom: function(room_capa, room_users, room_id) {
            // 入室上限数に達している
            if(room_capa != room_users) {
                this.$store.commit('IncrementRoomUser', room_id)
                this.$router.push({name: "RoomView", params: {id: room_id}})
            } else {
                alert("満員です")
            }
        }
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
