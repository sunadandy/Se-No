<template>
    <div>
        <v-btn variant="contained-text" :rounded="1" @click="DeleteRoom">部屋爆破</v-btn>
    </div>
</template>

<script>
import { getDatabase, ref, update, remove } from "firebase/database";

export default {
    name: "RoomDelete",
    methods:{
        DeleteRoom(){
            const key = this.$route.params.id
            const db = getDatabase();
            // 部屋削除要求を出す
            update(ref(db, 'Rooms/' + key), {"delete": true})
        }
    }
}

</script>

<style scoped>
</style>