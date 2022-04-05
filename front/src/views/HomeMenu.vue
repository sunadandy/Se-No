<template>
    <div>
        <div class="flex">
            <div class="menu">
                <router-link to="/">せーの！</router-link>
            </div>
            <div class="menu">
                <router-link to="/RoomForm">部屋を作る</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeMenu',
}
</script>

<style scoped>
    h1 {
        background-color: antiquewhite;
    }
    .flex {
        display:flex;             /* 縦二分割 */
        justify-content: left;    /* 中央寄せ */
        background-color: aquamarine;
    }
    .menu {
        margin:0px 10px;
    }
</style>