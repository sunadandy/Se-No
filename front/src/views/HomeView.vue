<template>
    <div>
        <room-form />
    </div>
    <div>
        <room-list />
    </div>
</template>

<script>
import RoomForm from '@/components/RoomForm'
import RoomList from '@/components/RoomList'

export default {
    name: 'HomeView',
    components: {
        RoomForm,
        RoomList,
    },
};
</script>