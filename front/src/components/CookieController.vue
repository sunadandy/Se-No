<template>
    <div></div>
</template>

<script>
export default {
    name: "CookieController",
    methods: {
        SetCookie: function() {
            // 0 - 65535でのランダムな整数を生成してクッキーとする
            let cookieVal = Math.floor(Math.random() * 65535)
            // Cookie名,値,保存日数
            this.$cookies.set("Cookie se-no", cookieVal, '10min')
        }
    },
}
</script>
