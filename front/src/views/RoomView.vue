<template>
    <room-menu />
    <div>
        現在、{{ room_users }}人が入室しています。({{ room_capa}}人部屋)<br>
    </div>
    <div>
        {{ room_sub }}
    </div>
</template>

<script>
import RoomMenu from '@/views/RoomMenu'

export default {
    name: "RoomView",
    components: {
        RoomMenu,
    },
    computed: {
        room_users: function() {
            return this.$store.getters.GetRoomInfoByID(this.$route.params.id).users
        },
        room_capa: function() {
            return this.$store.getters.GetRoomInfoByID(this.$route.params.id).capacity
        },
        room_sub: function() {
            return this.$store.getters.GetRoomInfoByID(this.$route.params.id).subject
        }

    }
}
</script>