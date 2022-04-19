<template>
    <div class="subject">
        <v-text-field placeholder="お題を設定しよう！" label="お題入力" v-on:keyup.enter='SubmitSubject' variant="underlined" clearable ref="input">
            <v-progress-linear class="progress-liner"
                :active="submiting"
                :indeterminate="submiting"
                absolute
                color="deep-purple accent-4"
            ></v-progress-linear>
        </v-text-field>
    </div>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";

export default {
    name: "SubjectForm",
    data() {
        return {
            subject: "",
            submiting: false,
        }
    },
    watch: {
        submiting: function(val) {
            if (!val) return
            setTimeout(() => (this.submiting = false), 500)
        }
    },
    methods: {
        SubmitSubject: function() {
            const key = this.$route.params.id
            const db = getDatabase();
            const refdb = ref(db, "QA")
            this.subject = this.$refs.input.value
            this.submiting = true

            set(refdb, {[key]: {"subject": this.subject}})
        }
    }
};
</script>

<style scoped>
.subject {
    margin: 10px
}
.progress-liner {
    top: 35px
}
</style>