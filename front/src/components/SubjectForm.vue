<template>
    <div>
        <input type=text placeholder="お題を設定しよう！" size=60 v-model='subject'>
    </div>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";

export default {
    name: "SubjectForm",
    data() {
        return {
            subject: ""
        }
    },
    watch: {
        subject: function() {
            let key = this.$route.params.id

            const db = getDatabase();
            set(ref(db, "Q&A/" + key), {"subject": this.subject})
        }
    },
};
</script>

<style scoped>
</style>