<template>
    <div>
        <subject-form />
        <button class="se-no btn" @click="ShowAnswers">せーの！</button>
    </div>
    <div>
        <button v-for="user in room.users" :key="user">{{ user }}</button>
    </div>
    <div>
        {{ room.subject }}
    </div>
    <div>
        <room-exit />
    </div>
</template>

<script>
import RoomExit from '@/components/RoomExit'
import SubjectForm from '@/components/SubjectForm'
import { getDatabase, ref, onValue } from "firebase/database";

export default {
    name: "RoomView",
    components: {
        RoomExit,
        SubjectForm,
    },
    data() {
        return {
            room: [],
        }
    },
    mounted: function() {
        // URLからキー取得
        let key = this.$route.params.id
        
        const db = getDatabase();
        onValue(ref(db, 'Rooms/' + key), (obj) => {
            if (obj.exists()) {
                this.room = obj.val()
            }
        }, { onlyOnce: false });
    },
    methods: {
        ShowAnswers: function() {
            
        }
    }
}
</script>