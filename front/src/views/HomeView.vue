<template>
    <home-menu />
    <div>
        <h2>現在作られている部屋一覧</h2>
        <room-list></room-list>
    </div>
</template>

<script>
import HomeMenu from '@/views/HomeMenu'
import RoomList from '@/components/RoomList'

export default {
    name: 'HomeView',
    components: {
      HomeMenu,
      RoomList
    },
};
</script>